import {Component, OnInit} from '@angular/core';
import {NetworkService} from "../network.service";
import {showMessage, CryptoKey, getParams, decrypt, newCryptoKey, hashCode, setParams} from "../../tools";
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
  styleUrls: ['./tokendoc.component.css']
})
export class TokendocComponent implements OnInit {
    identity_types: string[]=["Numéro de Passeport","Numéro de sécurité sociale","Email"];
    identity_type: any = this.identity_types[2];
    identity: string = "";
    address:string="paul.dudule@gmail.com"       //Peut être une adresse de blockchain ou un email
    document: any;

    collection:Collection | undefined;
    miner:CryptoKey=newCryptoKey();
    visual="";
    joinDoc:any;
    message: string = "";

    constructor(public network:NetworkService,
                public dialog:MatDialog,
                public routes:ActivatedRoute) {

    }



    async ngOnInit() {
        let params:any=await getParams(this.routes);

        this.miner=newCryptoKey("","","")
        this.miner.encrypt=params.miner_key || environment.tokendoc.miner_key;
        this.identity=params.identity || "";

        this.network.network=params.network || environment.tokendoc.network;
        this.collection=newCollection(params.collection || environment.tokendoc.collection,this.miner);
    }

    update_identity(new_value:any) {
        this.identity_type=new_value;
    }

    onFileSelected($event: any) {
        this.document=$event;
        this.document["signature"]=hashCode(this.document.file);
        this.document["url"]=""
        if($event.file.startsWith("data:image")){
            this.visual=$event.file;
        }else{
            this.visual=environment.tokendoc.visual;
        }
    }

    async send(cb: string) {
        let signature:string=hashCode(this.document.file+"/"+this.identity_type+":"+this.identity).toString(16);
        if(this.miner){
            let address=await _prompt(this,"Adresse de réception du NFT","paul.dudule@gmail.com","","text","Envoyer","Annuler",false);
            if(address){
                let url_mail=environment.appli+"/assets/new_account.html";
                wait_message(this,"Création du compte");
                this.network.create_account(this.network.network,this.address,url_mail).subscribe((account:any)=>{
                    wait_message(this,"Mise en ligne du visuel");
                    this.network.upload(this.visual,environment.tokendoc.metadata_storage).subscribe(async (v:any)=>{
                        wait_message(this,"Fabrication du NFT");
                        let nft:NFT={
                            address: undefined,
                            attributes: [{trait_type:this.identity_type,value:this.identity}],
                            collection: this.collection,
                            creators: [],
                            description: this.document.url,
                            files: [this.document.url],
                            links: undefined,
                            marketplace: {quantity:5,price:0},
                            message: undefined,
                            miner: this.miner,
                            name: "CertificatNFluent",
                            network: this.network.network,
                            owner: account.address,
                            royalties: 0,
                            solana: undefined,
                            style: undefined,
                            symbol: signature,
                            tags: "",
                            visual: this.visual
                        }
                        let minage:any=await this.network.mint(nft,this.miner,account.address,"",false,environment.tokendoc.metadata_storage,this.network.network)
                        wait_message(this)
                        if(minage.error==""){
                            showMessage(this,"Consulter votre mail")
                            let url_wallet=environment.wallet+setParams({
                                address:account.address,
                                toolbar:false
                            });
                            open(url_wallet,"Explorer")
                        } else {
                            showMessage(this,"Probleme technique "+minage.error)
                        }
                    })
                })
            }

        }

    }

    raz_document() {
        this.document=null
        this.visual="";
    }

    upload_document(new_value:any) {
        if(new_value.checked){
            if(!this.document.url){
                wait_message(this,"Chargement du document");
                this.network.upload(this.document,environment.tokendoc.doc_storage,this.document.type).subscribe((r:any)=>{
                    wait_message(this)
                    this.document.url=r.url;
                })
            }
        } else {
            this.document.url="";
        }
    }
}
