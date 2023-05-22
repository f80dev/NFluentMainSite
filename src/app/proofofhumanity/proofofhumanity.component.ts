import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {$$, CryptoKey, get_nfluent_wallet_url, getParams, isEmail, newCryptoKey, showMessage} from "../../tools";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NFT} from "../../nft";
import {wait_message} from "../hourglass/hourglass.component";
import {NetworkService} from "../network.service";
import {Collection, newCollection} from "../../operation";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-proofofhumanity',
  templateUrl: './proofofhumanity.component.html',
  styleUrls: ['./proofofhumanity.component.css']
})
export class ProofofhumanityComponent implements OnInit {
    appname=""
    claim=""
    siteKey: any;
    network:string="";
    address: string="";
    background_image: string="";
    aFormGroup: FormGroup | undefined;
    collection:Collection | undefined;
    miner:CryptoKey=newCryptoKey("","",environment.poh.miner)
    message="";

    constructor(
        public formBuilder: FormBuilder,
        public toast:MatSnackBar,
        public _location:Location,
        public api:NetworkService,
        public routes:ActivatedRoute
    ) {
    }


    handleExpire() {

    }

    handleLoad() {

    }

    async handleSuccess($event: any) {
        let owner=this.address;
        let nft:NFT={
            attributes: [],
            balances: undefined,
            type: "NonFungible",
            address: undefined,
            collection: this.collection,
            creators: [{address:this.miner?.address,share:100,verified:true}],
            description: "",
            files: [],
            links: undefined,
            supply:1,
            price: 0,
            message: undefined,
            miner: this.miner,
            name: "PoH",
            network: this.network,
            owner: owner,
            royalties: 0,
            solana: undefined,
            style: undefined,
            symbol: "NFT PoH",
            tags: "PoH",
            visual: this.background_image
        }
        $$("Minage du NFT attribué a "+owner)

        wait_message(this,"Enregistrement de la preuve")
        let minage:any=await this.api.mint(nft,this.miner,owner,"",false,"nftstorage",this.network)
        wait_message(this);

        if(minage.error==""){
            showMessage(this,"Votre wallet détient une preuve d'humanité")
        } else {
            showMessage(this,"Probleme technique "+minage.error)
        }
        this.address="";
    }

    handleReset() {
        this.address="";
    }

    authent(evt: { strong: boolean; address: string; provider: any }) {
        if(evt.strong && this.collection){
            this.api.getBalance(evt.address,this.network,this.collection.id).subscribe((result:any) => {
                if(result && result.length>0 && result[0]["balance"]==0)this.address=evt.address;
            });
        }
        if(this.address.length==0){
            showMessage(this,"Ce wallet dispose déjà d'une preuve d'humanité")
            this._location.back();
        }
    }

    async ngOnInit() {
        let params:any=await getParams(this.routes);
        this.background_image=params.visual || environment.poh.visual;
        this.appname=params.appname || environment.poh.appname;
        this.claim=params.claim || environment.poh.claim;
        this.network=params.network || environment.poh.network;
        this.miner=newCryptoKey("","","",params.miner || environment.poh.miner);
        this.collection=newCollection(params.sel_col || environment.poh.collection,this.miner);

        this.aFormGroup = this.formBuilder.group({
            recaptcha: ['', Validators.required]
        });
    }
}
