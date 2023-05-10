import { Component } from '@angular/core';
import {hashCode} from "../../tools";

@Component({
  selector: 'app-tokendoc-verify',
  templateUrl: './tokendoc-verify.component.html',
  styleUrls: ['./tokendoc-verify.component.css']
})
export class TokendocVerifyComponent {
    document: any;
    address: string="";

    onFileSelected($event: any) {
        //let signature:string=hashCode(this.document.file+"/"+this.identity_type+":"+this.address).toString(16);
    }
}
