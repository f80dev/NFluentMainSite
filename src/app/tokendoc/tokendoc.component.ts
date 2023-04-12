import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NetworkService} from "../network.service";
import {
    showMessage,
    CryptoKey,newCryptoKey,
    getParams,

    get_nfluent_wallet_url, $$, now
} from "../../tools";
import {NFT} from "../../nft";
import {ActivatedRoute} from "@angular/router";
import {Collection, newCollection} from "../../operation";
import {_prompt} from "../prompt/prompt.component";
import {environment} from "../../environments/environment";
import {wait_message} from "../hourglass/hourglass.component";
import {MatDialog} from "@angular/material/dialog";

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
    sel_visuel:any;

    collection:Collection | undefined;
    miner:CryptoKey=newCryptoKey();
    visual="";
    joinDoc:boolean=true;
    message: string = "";
    show_scanner: boolean=false;
    url_wallet: string="";
    url_explorer:string="";
    url_gallery:string="";
    infos: string="";
    advanced_mode: boolean=false;
    max_supply: number=1;
    stockage: string="github-nfluentdev-storage-main";
    stockage_document:string="github-nfluentdev-storage-main";
    appname: string=environment.tokendoc.appname;
    claim:string=environment.tokendoc.claim;
    visuels: string[]=[];
    message_preview="";
    show_login: boolean=false;
    user: any={};
    name: string="Certificat de propriété";
    visuel_size="200px";
    nft_size: number=200;


    constructor(public network:NetworkService,
                public dialog:MatDialog,
                public routes:ActivatedRoute) {

    }



    async read_param(){
        let params:any=await getParams(this.routes);
        $$("Lecture des parametres ",params)
        if(params.hasOwnProperty("advanced_mode"))this.advanced_mode=(params.advanced_mode=='true');
        this.miner=newCryptoKey("","","")
        this.miner.encrypt=params.miner || environment.tokendoc.miner_key;
        this.identity=params.identity || "";
        this.stockage=params.stockage || environment.tokendoc.stockage;
        this.appname=params.appname || environment.tokendoc.appname;
        this.claim=params.claim || environment.tokendoc.claim;
        this.stockage_document=params.stockage_document || environment.tokendoc.stockage_document;
        this.max_supply=Number(localStorage.getItem("max_supply") || "1");
        this.infos=localStorage.getItem("infos") || "";

        this.network.network=params.network || environment.tokendoc.network;
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
    }


    ngOnInit() {
        setTimeout(()=>{
            this.read_param();
            this.visuels=[environment.tokendoc.visual];
            this.eval_preview(this.visuels[0]);
        },500);
    }



    update_identity(new_value:any) {
        this.identity="";
        this.identity_type=new_value;
    }




    save_local(){
        localStorage.setItem("infos",this.infos);
        localStorage.setItem("max_supply",this.max_supply.toString());

        for(let document of this.documents){
            if(document.file.length>10000)return;
        }

        for(let visuel of this.visuels){
            if(visuel.length>10000)return;
        }

        localStorage.setItem("documents",JSON.stringify(this.documents));
        if(this.visuels.length>0)localStorage.setItem("visuels",this.visuels[0]);
    }


    onFileSelected($event: Document) {
        let document=$event;
        document.url=""

        this.documents.push(document);
        this.upload_document();
        this.eval_signatures();

        if($event.file.startsWith("data:image")){
            this.visuels=[$event.file];
            this.eval_preview($event.file);
        }

        this.save_local();
    }



    async send(cb: string) {
        $$("minage sur le réseau "+this.network.network)
        if(this.miner){
            let _default=localStorage.getItem("last_dest") || "";
            let address=await _prompt(this,"Adresse de réception du NFT",_default,"","text","Envoyer","Annuler",false);
            if(address){
                localStorage.setItem("last_dest",address);
                wait_message(this,"Mise en ligne du visuel du certificat");
                this.network.upload(this.sel_visuel,this.stockage).subscribe(async (image:any)=>{
                    wait_message(this,"Création du compte sur "+this.network.network);
                    this.network.create_account(
                        this.network.network,
                        address,
                        environment.appli+"/assets/wallet_access.html",
                        environment.appli+"/assets/existing_account_wallet_access.html"
                    ).subscribe(async (account:any)=>{
                        wait_message(this,"Fabrication du NFT");
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
                            balances: undefined,
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
                            visual: image.url
                        }
                        $$("Minage du NFT attribué a "+account.address)
                        let minage:any=await this.network.mint(nft,this.miner,owner,"",false,this.stockage,this.network.network)
                        wait_message(this)
                        if(minage.error==""){
                            localStorage.removeItem("document");
                            showMessage(this,"Consulter votre mail")
                            this.url_wallet=get_nfluent_wallet_url(owner,this.network.network,environment.wallet);
                            this.url_explorer=minage.link_mint;
                            this.url_gallery=minage.link_gallery;
                        } else {
                            showMessage(this,"Probleme technique "+minage.error)
                        }
                    })
                })
            }
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
                        this.network.upload(document,this.stockage_document,document.type).subscribe((r:any)=>{
                            if(r && r.url){
                                document.url=r.url.replace(" ","%20");
                                document.signature=r.hash
                                i=i+1;
                                if(i==this.documents.length)resolve(true);
                            }
                        },()=>{
                            showMessage(this,"Probléme technique. Document non attaché");
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
                this.visuels=[environment.tokendoc.visual];
                this.eval_preview(this.visuels[0]);
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
        let filename="capture_"+now("str")+".jpg"
        this.onFileSelected({
            url:"",
            file:$event.data,
            signature: "",
            filename:filename,
            type:"image/jpeg"
        });
    }

    eval_preview(visual:string="") {
        let url_config = environment.appli + "/assets/config_certificat_photo.yaml";
        this.message_preview="Preview en cours de construction";
        if(visual.length>0)this.visual=visual;

        this.network.send_photo_for_nftlive(
            10, url_config,this.nft_size.toString(),
            80,
            "",
            [
                {name: "__title__",value: this.name},
                {name: "__dtMining__",value:now("date")}
            ], {photo: this.visual}, "base64").subscribe(async (visuels: any) => {
                this.message_preview="";
                this.visuels = visuels.images;
                let size=(350/this.visuels.length)
                if(size<100)size=100;
                this.visuel_size=size+"px";
                if(!this.sel_visuel)this.sel_visuel=visuels.images[0];
        },()=>{
            this.message_preview="";
        })
    }

    select_visual($event: any) {
        this.visuels=[$event.file];
        this.eval_preview($event.file);
    }

    login(event:any) {
        this.user=event;
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
}
