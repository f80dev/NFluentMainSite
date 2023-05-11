import {Component, OnInit} from '@angular/core';
import {NetworkService} from "../network.service";
import {environment} from "../../environments/environment";
import {wait_message} from "../hourglass/hourglass.component";
import {GalleryState, ImageItem} from "ng-gallery";
import {NFT} from "../../nft";
import {
    $$,
    getParams,
    newCryptoKey,
    CryptoKey,
    showMessage,
    get_nfluent_wallet_url,
    showError,
    isEmail, rotate
} from "../../tools";
import {Collection, newCollection} from "../../operation";
import {ActivatedRoute} from "@angular/router";
import {init_visuels} from "../../tools_web";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StyleManagerService} from "../style-manager.service";
import {_ask_for_paiement} from "../ask-for-payment/ask-for-payment.component";
import {UserService} from "../user.service";
import {MatDialog} from "@angular/material/dialog";
import {extract_merchant_from_param, Merchant} from "../payment/payment.component";

@Component({
  selector: 'app-nftlive',
  templateUrl: './nftlive.component.html',
  styleUrls: ['./nftlive.component.css']
})
export class NftliveComponent implements OnInit {
    photo: any;
    visuels:any[]=[];
    message="";
    sel_visuel: any;
    dests="paul.dudule@gmail.com";
    name="Ma Photo";
    infos="";
    miner: CryptoKey=newCryptoKey();
    stockage: string="";
    stockage_document: string="";
    appname: string="";
    claim:string="";
    collection: Collection | undefined;
    url_gallery: string = "";
    url_wallet: string = "";
    max_supply =1;
    nft_size=800;
    merchant: Merchant | undefined;
    api_key_document: string="";
    background_image="";

    public constructor(
        public network:NetworkService,
        public routes:ActivatedRoute,
        public toast:MatSnackBar,
        public user:UserService,
        public style:StyleManagerService,
        public dialog:MatDialog
    ) {
    }

    ngOnInit(): void {
        setTimeout(()=>{this.read_param()},200);
        this.style.setStyle("theme","nfluent-dark-theme.css")
    }

    isSemiFungible() {
        if(!this.collection?.type)return false;
        return this.collection?.type.startsWith('SemiFungible')
    }


    onFileSelected($event: any) {
        this.photo=$event;
    }

    preview(limit=10,config=environment.appli + "/assets/config_nftlive.yaml") {
        let message="Préparation des propositions de NFTs";
        if(this.photo.file.length>100000)message=message+" (le délai de préparation peut excéder 1 minute)"
        wait_message(this,message);
        let seed=Math.round(Math.random()*100);

        $$("On récupére une première image et la taille de la sequences")
        this.network.send_photo_for_nftlive(
            limit,config, this.nft_size.toString(),
            80,"",[{name:"title", value:this.name}],
            {photo:this.photo}, "base64").subscribe((result:any)=>{
            this.visuels=init_visuels(result.images);
            if(this.visuels.length>0) this.sel_visuel=this.visuels[0];
            wait_message(this);

            // let seq:number[]=[]
            // for(let i=1;i<result.sequences.length;i=i+1)seq.push(i);
            // this.network.send_photo_for_nftlive(
            //     limit,config, this.nft_size.toString(),
            //     80,"",[{name:"title", value:this.name}],
            //     {photo:this.photo}, "base64",seq,seed).subscribe((visuels:any)=>{
            //     this.visuels.push(init_visuels(visuels.images))
            //     wait_message(this,"");
            // })
        },(err)=>{
                showError(this,err);
                wait_message(this);
        })


    }

    restart() {
        this.sel_visuel=undefined;
        this.url_wallet="";
        this.url_gallery="";
        this.dests="";
        this.visuels=[];
        this.photo=undefined;
    }

    async read_param() {
        let params: any = await getParams(this.routes);
        $$("Lecture des parametres ", params)
        this.miner = newCryptoKey("", "", "")
        this.background_image=params.visual || "";
        this.miner.encrypt = params.miner || environment.tokendoc.miner_key;
        this.stockage = params.stockage || environment.tokendoc.stockage;
        this.stockage_document = params.stockage_document || environment.tokendoc.stockage_document;
        this.api_key_document=params.api_key_document || "";
        this.appname = params.appname || environment.tokendoc.appname;
        this.claim = params.claim || environment.tokendoc.claim;
        this.collection = newCollection(params.collection || environment.tokendoc.collection, this.miner);
        this.network.network = params.network || environment.tokendoc.network;
        this.merchant=extract_merchant_from_param(params);
    }

    return_error(){
            wait_message(this);
            showMessage(this,"Incident technique, veuillez recommencer");
    }

    async ask_for_mint(){
        let rep:any=await _ask_for_paiement(this,
            this.merchant!.wallet!.token,
            environment.nftlive.crypto_price,environment.nftlive.fiat_price,
            this.merchant!,
            this.user.wallet_provider,
            "Frais de fabrication et d'enregistrement du NFT",
            "Choisissez un mode de paiement",
            "",
            "",{contact: "", description: "", subject: ""})

        if(rep){
            this.user.init_wallet_provider(rep.data.provider,rep.address)
            this.user.buy_method=rep.buy_method;
            this.mint();
        }
    }

    async mint() {
        if(this.sel_visuel){
            let idx=0;
            for(let address of this.dests.split(' ')){
                wait_message(this,"Création d'un wallet pour "+address);
                this.network.create_account(
                    this.network.network,
                    address,
                    environment.appli+"/assets/wallet_access.html",
                    environment.appli+"/assets/existing_account_wallet_access.html"
                ).subscribe(async (account:any)=> {
                    wait_message(this,"Minage du NFT");
                    let owner=account.address

                    this.network.upload(this.photo.file,this.stockage_document,this.api_key_document).subscribe(async (file:any)=>{
                        this.network.upload(this.sel_visuel.data.src,this.stockage).subscribe(async (addr_visual:any)=>{
                            let nft:NFT={
                                balances: undefined,
                                type: "SemiFungible",
                                address: undefined,
                                attributes: [],
                                collection: this.collection,
                                creators: [{address:this.miner.address,share:100,verified:true}],
                                description: this.infos,
                                files: [file],
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
                                symbol: "NFTLive NFT #"+idx,
                                tags: "NFTLive",
                                visual: addr_visual.url
                            }
                            $$("Minage du NFT attribué a "+account.address)
                            idx=idx+1;
                            let minage:any=await this.network.mint(nft,this.miner,owner,"",false,this.stockage,this.network.network)

                            wait_message(this);
                            if(minage.error==""){
                                if(isEmail(address))showMessage(this,"Consulter votre mail "+address+" pour retrouver votre NFT")
                                this.url_wallet=get_nfluent_wallet_url(owner,this.network.network,environment.wallet);
                                this.url_gallery=minage.link_gallery;
                            } else {
                                showMessage(this,"Probleme technique "+minage.error)
                            }
                        },()=>{this.return_error();});
                    })
                },()=>{this.return_error()});
            }
        }

    }

    clear_preview() {
        this.visuels=[];
    }

    select_visuel($event: GalleryState) {
        this.sel_visuel=this.visuels[$event.currIndex!];
    }

    async rotate_photo() {
        if(this.photo.file){
            this.photo.file=await rotate(this.photo.file,90);
        }
    }


    is_animated_photo() {
        let file=this.photo.file.substring(0,100);
        return file.indexOf("gif")>-1
    }
}
