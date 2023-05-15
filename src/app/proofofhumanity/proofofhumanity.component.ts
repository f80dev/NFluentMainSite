import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {getParams} from "../../tools";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-proofofhumanity',
  templateUrl: './proofofhumanity.component.html',
  styleUrls: ['./proofofhumanity.component.css']
})
export class ProofofhumanityComponent implements OnInit {
    appname=""
    claim=""
    siteKey: any;
    address: string="";
    background_image: string="";

    constructor(
        public routes:ActivatedRoute
    ) {
    }


    handleExpire() {

    }

    handleLoad() {

    }

    handleSuccess($event: any) {

    }

    handleReset() {

    }

    authent(evt: { strong: boolean; address: string; provider: any }) {
        if(evt.strong){
            this.address=evt.address;
        }
    }

    async ngOnInit() {
        let params:any=await getParams(this.routes);
        this.background_image=params.visual || environment.poh.visual;
        this.appname=params.appname || environment.poh.appname;
        this.appname=params.appname || environment.poh.appname;
        this.claim=params.claim || environment.poh.claim;
    }
}
