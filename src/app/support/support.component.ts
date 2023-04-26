import { Component } from '@angular/core';
import {showMessage} from "../../tools";
import {NetworkService} from "../network.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  applis=["TokenForge","NFluent Web Site","TokenSign"];
  name: any;
  appli: any;
  message: any;
  email: any;
  subject: any;

  constructor(
      public network:NetworkService,
      public toast:MatSnackBar
  ) {

  }
  send_message() {
    this.network.send_mail_to_contact(this.email,this.message,this.subject,this.name).subscribe(()=>{
      showMessage(this,"Message sended");
      this.message="";
      this.subject="";
    })
  }

}
