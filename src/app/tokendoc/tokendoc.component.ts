import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NetworkService} from "../network.service";
import {
    showMessage,
    CryptoKey, newCryptoKey,
    getParams,
    get_nfluent_wallet_url, $$, now, showError, isEmail
} from "../../tools";
import {NFT} from "../../nft";
import {ActivatedRoute} from "@angular/router";
import {Collection, newCollection} from "../../operation";
import {_prompt} from "../prompt/prompt.component";
import {environment} from "../../environments/environment";
import {wait_message} from "../hourglass/hourglass.component";
import {MatDialog} from "@angular/material/dialog";
import {GalleryState} from "ng-gallery";
import {init_visuels} from "../../tools_web";
import {StyleManagerService} from "../style-manager.service";
import {UserService} from "../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {_ask_for_paiement} from "../ask-for-payment/ask-for-payment.component";
import {extract_merchant_from_param, Merchant} from "../payment/payment.component";

export interface Document {
    url: string;
    signature: string;
    file:string
    type:string
    filename:string
}

@Component({
  selector: 'app-tokendoc',
  templateUrl: './tokendoc.component.html',
  styleUrls: ['./tokendoc.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TokendocComponent implements OnInit {
    identity_types: string[]=["Numéro de Passeport","Numéro de sécurité sociale","Email"];
    identity_type: any = this.identity_types[2];
    identity: string = "";
    address:string=""       //Peut être une adresse de blockchain ou un email
    documents: Document[]=[];
    sel_visuel: any;
    collection:Collection | undefined;
    miner:CryptoKey=newCryptoKey();
    visual="";
    joinDoc:boolean=true;
    message: string = "";
    show_scanner: boolean=false;
    url_wallet: string="";
    url_explorer:string="";
    url_gallery:string="";
    config:string=environment.appli + "/assets/"+environment.tokendoc.start_config
    infos: string="";
    advanced_mode: boolean=false;
    max_supply: number=1;
    stockage: string="github-nfluentdev-storage-main";
    stockage_document:string="github-nfluentdev-storage-main";
    appname: string=environment.tokendoc.appname;
    claim:string=environment.tokendoc.claim;
    visuels: any[]=[];
    message_preview="";
    show_login: boolean=false;
    name: string="Certificat de propriété";
    visuel_size="200px";
    nft_size: number=400;
    price: number = environment.tokendoc.cost_in_crypto;
    fiat_price:number=  environment.tokendoc.cost_in_fiat;
    money:{name:string,supply:number,id:string} | undefined;
    merchant: Merchant | undefined;
    api_key_document: string = "";

    constructor(public network:NetworkService,
                public dialog:MatDialog,
                public user:UserService,
                public toast:MatSnackBar,
                public theme:StyleManagerService,
                public routes:ActivatedRoute) {

    }


    async read_param(){
        let params:any=await getParams(this.routes);
        $$("Lecture des parametres ",params)

        if(params.hasOwnProperty("advanced_mode"))this.advanced_mode=(params.advanced_mode=='true');
        this.miner=newCryptoKey("","","")
        this.miner.encrypt=(params.miner || environment.tokendoc.miner_key);
        if(this.miner.encrypt)this.miner.encrypt=this.miner.encrypt.trim()
        this.identity=params.identity || "";
        if(params.price)this.price=Number(params.price)
        if(params.fiat_price)this.fiat_price=Number(params.fiat_price)

        this.stockage=params.stockage || environment.tokendoc.stockage;
        this.appname=params.appname || environment.tokendoc.appname;
        this.claim=params.claim || environment.tokendoc.claim;

        this.stockage_document=params.stockage_document || environment.tokendoc.stockage_document;
        this.api_key_document=params.api_key_document || ""

        this.max_supply=Number(localStorage.getItem("max_supply") || "1");
        this.infos=localStorage.getItem("infos") || "";
        this.merchant=extract_merchant_from_param(params);

        this.network.network=params.network || environment.tokendoc.network;
        this.network.get_token(params.money || "egld",this.network.network).subscribe((money)=>{this.money=money});
        this.network.get_collections(params.collection || environment.tokendoc.collection).subscribe((cols:any)=>{
            if(cols.length==0){
                $$("La collection en parametre n'est pas disponible");
                this.collection=newCollection(params.collection || environment.tokendoc.collection,this.miner);
            }else{
                this.collection=cols[0];
            }
        })

        if(localStorage.getItem("documents")){
            for(let document of JSON.parse(localStorage.getItem("documents") || "[]")){
                this.onFileSelected(document);
            }
            this.upload_document();
            this.eval_signatures();
        }

        this.eval_preview(environment.tokendoc.visual,true);
    }


    ngOnInit() {
        this.theme.setStyle("theme","nfluent-dark-theme.css")
        this.read_param();
    }



    update_identity(new_value:any) {
        this.identity="";
        this.identity_type=new_value;
    }



    save_local(){
        localStorage.setItem("infos",this.infos);
        localStorage.setItem("max_supply",this.max_supply.toString());
        localStorage.setItem("title",this.name);

        for(let document of this.documents)
            if(document.file.length>10000)return;

        for(let visuel of this.visuels)
            if(visuel.length>10000)return;

        localStorage.setItem("documents",JSON.stringify(this.documents));
        if(this.visuels.length>0)localStorage.setItem("visual",this.visual);
    }


    onFileSelected($event: Document) {
        let document=$event;
        document.url=""

        this.documents.push(document);
        this.upload_document();
        this.eval_signatures();

        if($event.file.startsWith("data:image")){
            this.config=environment.appli + "/assets/config_certificat_photo.yaml"
            this.eval_preview($event.file,true);
        }

        this.save_local();
    }



    async send(cb: string) {
        $$("minage sur le réseau "+this.network.network)
        if(this.miner){
            if(this.price>0 || this.fiat_price>0){
                try{
                    let rep:any=await _ask_for_paiement(this,
                        environment.merchant.wallet.token,
                        this.price,this.fiat_price,
                        environment.merchant,
                        this.user.wallet_provider,
                        "Frais de minage du certificat",
                        "Choisissez un mode de paiement",
                        "",
                        "",{contact: "", description: "", subject: ""})

                    if(rep){
                        this.user.wallet_provider=rep.data.provider;
                        this.user.buy_method=rep.buy_method;
                        if(rep.billing_to)showMessage(this,"Retrouvé votre facture sur "+rep.billing_to)
                        this.run_mining(rep.address);
                    } else {
                        showMessage(this,"Paiement annulé")
                        return
                    }
                } catch(e){
                    showMessage(this,"Paiement annulé")
                    return;
                }
            }


        }
    }


    async run_mining(addr:string){
        let miner_addr=this.miner.address
        let address=localStorage.getItem("last_dest") || addr || this.user.profil.email;
        if(!this.user.isConnected())
            address=await _prompt(this,"Adresse de réception du NFT",address,"","text","Envoyer","Annuler",false);
        if(address){
            localStorage.setItem("last_dest",address);
            wait_message(this,"Mise en ligne du visuel du certificat");
            let src_image=this.sel_visuel.data.src;
            this.network.upload(src_image,this.stockage).subscribe(async (image:any)=>{
                if(!image){
                    showError(this,"Problème de mise en ligne de l'image");
                    return;
                }
                wait_message(this,"Création du compte sur "+this.network.network);
                this.network.create_account(
                    this.network.network,
                    address,
                    environment.appli+"/assets/wallet_access.html",
                    environment.appli+"/assets/existing_account_wallet_access.html"
                ).subscribe(async (account:any)=>{
                    wait_message(this,"Fabrication du NFT"+account.explorer);
                    let files=this.documents.map((x:any)=>{return x["url"]});
                    let attributes=[]
                    if(this.identity){
                        attributes.push({trait_type:this.identity_type,value:this.identity})
                    }
                    for(let doc of this.documents){
                        if(doc.filename.length>0){
                            attributes.push({trait_type:doc.filename,value:doc.signature})
                        }else{
                            attributes.push({trait_type:doc.url,value:doc.signature})
                        }
                    }

                    let owner=account.address
                    let nft:NFT={
                        type: "SemiFungible",
                        address: undefined,
                        attributes: attributes,
                        collection: this.collection,
                        creators: [{address:this.miner.address,share:100,verified:true}],
                        description: this.infos,
                        files: files,
                        links: undefined,
                        supply:this.max_supply,
                        price: 0,
                        message: undefined,
                        miner: this.miner,
                        name: this.name,
                        network: this.network.network,
                        owner: owner,
                        royalties: 0,
                        solana: undefined,
                        style: undefined,
                        symbol: "NFluenTCertif",
                        tags: "Certificat",
                        visual: image.url,
                        balances: {},
                    }
                    nft["balances"][miner_addr]=this.max_supply
                    $$("Minage du NFT attribué a "+account.address)
                    try{
                        let minage:any=await this.network.mint(nft,this.miner,owner,"",false,this.stockage,this.network.network)
                        wait_message(this)
                        if(minage.error==""){
                            localStorage.removeItem("document");
                            if(isEmail(address))showMessage(this,"Consulter votre mail "+address+" pour retrouver votre NFT")
                            this.url_wallet=get_nfluent_wallet_url(owner,this.network.network,environment.wallet);
                            this.url_explorer=minage.link_mint;
                            this.url_gallery=minage.link_gallery;
                        } else {
                            showMessage(this,"Probleme technique "+minage.error)
                        }
                    } catch (e) {
                        wait_message(this)
                        showError(this,e);
                    }

                })
            })
        }
    }


    raz_document(document:any) {
        this.documents.splice(this.documents.indexOf(document),1);
        this.visual="";
        this.save_local();
    }


    async upload_document() {
        return new Promise(resolve => {
            let i=0;
            if(this.joinDoc){
                for(let document of this.documents){
                    if(document.file.startsWith("http")){
                        document.url=document.file;
                        i=i+1;
                        if(i==this.documents.length)resolve(true);
                    }
                    if(!document.url || document.url.length==0){
                        this.network.upload(document,this.stockage_document,document.type,"",this.api_key_document).subscribe((r:any)=>{
                            if(r && r.url){
                                document.url=r.url.replace(" ","%20");
                                document.signature=r.hash
                                i=i+1;
                                if(i==this.documents.length)resolve(true);
                            }
                        },(err)=>{
                            showError(this,"Probléme technique. Document non attaché");
                            this.joinDoc=false;
                        })
                    }
                }
            } else {
                for(let document of this.documents)
                    document["url"]="";
            }
        });

    }


    restart(force=false) {
        _prompt(this,"Effacer et recommencer ?","","","oui/non","Recommencer","Continuer",true,null,force).then((rep)=>{
            if(rep=="yes"){
                this.url_wallet='';
                this.url_explorer='';
                this.documents=[];
                this.sel_visuel=undefined;
                this.config=environment.appli + "/assets/"+environment.tokendoc.start_config
                this.visuels=[];
                this.eval_preview();
            }
        })
    }


    open_doc(document: any) {
        open(document.url,"view_document")
    }

    eval_signatures(){
        let l=[]
        for(let d of this.documents){
            if(d.signature=="")l.push(d.file);
        }
        if(l.length>0){
            this.network.hashcode(l).subscribe((result:string[])=> {
                for (let i=0;i<this.documents.length;i++) {
                    this.documents[i].signature = result[i];
                }
            })
        }
    }

    isSemiFungible() {
        if(!this.collection?.type)return false;
        return this.collection?.type.startsWith('SemiFungible')
    }

    capture($event: any) {
        this.show_scanner=false;
        let filename="capt_"+now("hex")+".jpg"
        this.onFileSelected({
            url:"",
            file:$event.data,
            signature: "",
            filename:filename,
            type:"image/jpeg"
        });
    }

    eval_preview(visual:string="",force=false) : boolean {
        if(visual.length>0)this.visual=visual;
        if(!force && this.name==localStorage.getItem("title"))return true;

        $$("Mise a jour des visuels avec "+visual)
        this.save_local();

        this.message_preview="Preview en cours de construction";
        this.network.send_photo_for_nftlive(
            10,this.config, this.nft_size.toString(), 80,"",
            [{name: "title",value: this.name}, {name: "dtMining",value:now("date")}],
            {photo: this.visual}, "base64").subscribe(async (visuels: any) => {
                this.message_preview="";
                this.visuels=init_visuels(visuels.images)
                if(!this.sel_visuel && this.visuels.length>0)this.sel_visuel=this.visuels[0];
        },()=>{
            this.message_preview="";
        })
        return true;
    }

    select_visual($event: any) {
        this.config=environment.appli + "/assets/config_certificat_photo.yaml"
        this.eval_preview($event.file,true);
    }

    login(event:any) {
        this.user.init_wallet_provider(event.provider,event.address)
        this.show_login=false;
    }

    disconnect() {
        this.show_login=false;
    }

    fail() {
        this.show_login=false;
    }

    cancel() {
        this.show_login=false;
    }

    open_image(image: string) {
        open(image,"preview");
    }

    async attach_document() {
        let url=await _prompt(this,"Indiquer l'url du document a attacher","https://");
        if(!url.startsWith("http")){
            showMessage(this,"Ceci n'est pas une adresse internet")
            return;
        }
        this.documents.push({
            url:url,
            signature:"",
            file:url,
            filename:url,
            type:""
        });
        this.save_local();
        this.eval_signatures();
    }

    update_preview() {
        this.eval_preview();
    }

    select_visuel($event: GalleryState) {
        this.sel_visuel=this.visuels[$event.currIndex!]
    }
}
