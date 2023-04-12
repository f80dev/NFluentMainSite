import {Component, OnInit} from '@angular/core';
import {NetworkService} from "../network.service";
import {environment} from "../../environments/environment";
import {wait_message} from "../hourglass/hourglass.component";
import {GalleryState, ImageItem} from "ng-gallery";
import {NFT} from "../../nft";
import {$$, getParams, newCryptoKey,CryptoKey} from "../../tools";
import {Collection, newCollection} from "../../operation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-nftlive',
  templateUrl: './nftlive.component.html',
  styleUrls: ['./nftlive.component.css']
})
export class NftliveComponent implements OnInit {
    photo: any;
    visuels:any[]=[];
    visuel_size="150px";
    message="";
    sel_visuel: GalleryState | undefined;
    dests="paul.dudule@gmail.com";
    name="Ma Photo";
    infos="";
    miner: CryptoKey=newCryptoKey();
    stockage: string="";
    appname: string="";
    claim:string="";
    collection: Collection | undefined;

    public constructor(
        public network:NetworkService,
        public routes:ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        setTimeout(()=>{this.read_param()},200);
    }


    onFileSelected($event: any) {
        this.photo=$event;
    }

    preview() {
        wait_message(this,"Préparation des NFTs");
        this.network.send_photo_for_nftlive(
            10,
            environment.appli + "/assets/config_nftlive.yaml",
            "200",
            80,
            "",
            [{name:"title", value:this.name}], {photo: this.photo}, "base64").subscribe(async (visuels: any) => {

            wait_message(this);
            this.visuels = visuels.images.map((x:any)=>{return new ImageItem({src:x,thumb:x})});

        },()=>{

        })
    }

    restart() {
        this.sel_visuel=undefined;
        this.dests="";
        this.visuels=[];
    }

    async read_param() {
        let params: any = await getParams(this.routes);
        $$("Lecture des parametres ", params)
        this.miner = newCryptoKey("", "", "")
        this.miner.encrypt = params.miner || environment.tokendoc.miner_key;
        this.stockage = params.stockage || environment.tokendoc.stockage;
        this.appname = params.appname || environment.tokendoc.appname;
        this.claim = params.claim || environment.tokendoc.claim;
        this.collection = newCollection(params.collection || environment.tokendoc.collection, this.miner);

        this.network.network = params.network || environment.tokendoc.network;
    }

    async mint() {
        if(this.sel_visuel && this.sel_visuel.items && this.sel_visuel.currIndex){
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
                    let visual=this.visuels[this.sel_visuel?.currIndex || 0] || "";
                    let nft:NFT={
                        balances: undefined,
                        type: "SemiFungible",
                        address: undefined,
                        attributes: [],
                        collection: this.collection,
                        creators: [{address:this.miner.address,share:100,verified:true}],
                        description: this.infos,
                        files: [],
                        links: undefined,
                        supply:1,
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
                        visual: visual
                    }
                    $$("Minage du NFT attribué a "+account.address)
                    idx=idx+1;
                    let minage:any=await this.network.mint(nft,this.miner,owner,"",false,this.stockage,this.network.network)
                    wait_message(this,"");
                });
            }
        }

    }
}
