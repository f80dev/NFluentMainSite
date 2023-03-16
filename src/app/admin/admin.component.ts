import { Component } from '@angular/core';
import {environment} from "../../environments/environment";
import {setParams} from "../../tools";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    privateKey="";
    url="";
    collection="";

    eval_url() {
        this.url=environment.appli+"/"+setParams({
            privatekey:this.privateKey,
            network:environment.tokendoc.network,
            collection:this.collection
        })
    }


}
