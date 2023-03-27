import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NetworkService} from "../network.service";
import {
    showMessage,
    CryptoKey,
    getParams,
    newCryptoKey,
    hashCode,
    get_nfluent_wallet_url, $$, now
} from "../../tools";
import {NFT} from "../../nft";
import {ActivatedRoute} from "@angular/router";
import {Collection, newCollection} from "../../operation";
import {_prompt} from "../prompt/prompt.component";
import {environment} from "../../environments/environment";
import {wait_message} from "../hourglass/hourglass.component";
import {MatDialog} from "@angular/material/dialog";

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
    address:string="paul.dudule@gmail.com"       //Peut être une adresse de blockchain ou un email
    documents: any[]=[];

    collection:Collection | undefined;
    miner:CryptoKey=newCryptoKey();
    visual="";
    joinDoc:any;
    message: string = "";
    show_scanner: boolean=false;
    url_wallet: string="";
    url_explorer:string="";
    infos: string="";
    advanced_mode: boolean=false;
    max_supply: number=1;
    stockage: string="nftstorage";
    stockage_document:string="infura";
    appname: string=environment.tokendoc.appname;
    claim:string=environment.tokendoc.claim;
    preview: string[]=[];

    constructor(public network:NetworkService,
                public dialog:MatDialog,
                public routes:ActivatedRoute) {

    }



    async ngOnInit() {
        let params:any=await getParams(this.routes);
        $$("Parametres ",params)
        if(params.hasOwnProperty("advanced_mode"))this.advanced_mode=(params.advanced_mode=='true');
        this.miner=newCryptoKey("","","")
        this.miner.encrypt=params.miner || environment.tokendoc.miner_key;
        this.identity=params.identity || "";
        this.stockage=params.stockage || environment.tokendoc.stockage;
        this.appname=params.appname || environment.tokendoc.appname;
        this.claim=params.claim || environment.tokendoc.claim;
        this.stockage_document=params.stockage_document || environment.tokendoc.stockage_document;

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
        }

    }

    update_identity(new_value:any) {
        this.identity="";
        this.identity_type=new_value;
    }

    onFileSelected($event: any) {
        let document=$event;
        document["signature"]=hashCode(document.file);
        document["url"]=""

        this.documents.push(document);
        localStorage.setItem("documents",JSON.stringify(this.documents));

        if($event.file.startsWith("data:image")){
            this.visual=$event.file;
        }else{
            this.visual=environment.tokendoc.visual;
        }
    }

    eval_signatures() : string[] {
        let rc=[];
        for(let document of this.documents){
            rc.push(hashCode(document.file+"/"+this.identity_type+":"+this.identity).toString(16))
        }
        return rc;
    }

    async send(cb: string) {
        $$("minage sur le réseau "+this.network.network)
        if(this.miner){
            let address=await _prompt(this,"Adresse de réception du NFT","","","text","Envoyer","Annuler",false);
            if(address){
                let url_config=environment.appli+"/assets/config_certificat_photo.yaml";
                wait_message(this,"Elaboration du visuel");
                this.network.send_photo_for_nftlive(
                    1,url_config,"500",
                    80,this.documents[0].filename,
                    [{name:"title",value:this.documents[0].filename}],{photo:this.visual},"base64").subscribe(async (visuels:any)=>{

                        this.preview=visuels.images;
                        wait_message(this,"Mise en ligne");
                        this.network.upload(visuels.images[0],this.stockage).subscribe(async (image:any)=>{

                            let url_mail_new_account=environment.appli+"/assets/wallet_access.html";
                            let url_mail_existing_account=environment.appli+"/assets/existing_account_wallet_access.html";
                            wait_message(this,"Création du compte sur "+this.network.network);
                            this.network.create_account(this.network.network,this.address,url_mail_new_account,url_mail_existing_account).subscribe(async (account:any)=>{

                                wait_message(this,"Fabrication du NFT");
                                let files=this.documents.map((x:any)=>{return x["url"]});
                                let nft:NFT={
                                    address: undefined,
                                    attributes: [{trait_type:this.identity_type,value:this.identity}],
                                    collection: this.collection,
                                    creators: [],
                                    description: this.infos+this.eval_signatures().join(" "),
                                    files: files,
                                    links: undefined,
                                    marketplace: {quantity:this.max_supply,price:0},
                                    message: undefined,
                                    miner: this.miner,
                                    name: "CertificatNFluent",
                                    network: this.network.network,
                                    owner: account.address,
                                    royalties: 0,
                                    solana: undefined,
                                    style: undefined,
                                    symbol: "NFluenTCertif",
                                    tags: "",
                                    visual: image.url
                                }
                                let minage:any=await this.network.mint(nft,this.miner,account.address,"",false,this.stockage,this.network.network)
                                wait_message(this)
                                if(minage.error==""){
                                    localStorage.removeItem("document");
                                    showMessage(this,"Consulter votre mail")
                                    this.url_wallet=get_nfluent_wallet_url(account.address,this.network.network,environment.wallet);
                                    this.url_explorer=minage.link_mint;
                                } else {
                                    showMessage(this,"Probleme technique "+minage.error)
                                }
                            })
                    })
                })
            }
        }
    }

    raz_document(document:any) {
        this.documents.splice(this.documents.indexOf(document),1);
        this.visual="";
    }

    upload_document(new_value:any) {
        if(new_value.checked){
            for(let document of this.documents){
                if(!document.url){
                    this.network.upload(document,this.stockage_document,document.type).subscribe((r:any)=>{
                        document.url=r.url;
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
    }

    restart() {
        this.url_wallet='';
        this.url_explorer='';
        this.documents=[];
    }

    open_doc(document: any) {
        open(document.url,"view_document")
    }

    isSemiFungible() {
        if(!this.collection?.type)return false;
        return this.collection?.type.startsWith('SemiFungible')
    }

    capture($event: any) {
        let filename="capture "+now("str")+".png"
        this.show_scanner=false;
        this.onFileSelected({file:$event.data,filename:filename});
    }
}
