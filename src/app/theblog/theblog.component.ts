import { Component, OnInit } from '@angular/core';
import {showMessage} from "../../tools";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-theblog',
  templateUrl: './theblog.component.html',
  styleUrls: ['./theblog.component.css']
})
export class TheblogComponent implements OnInit {

  addr="";

  constructor(public toast:MatSnackBar) {
  }

  ngOnInit(): void {
  }

  authent($event: any) {
    if(!$event.nftcheck){
      showMessage(this,"Authentification réussie mais vous ne possédez pas les NFT requis");
    } else {
      this.addr=$event.addr;
    }
  }

  cancel() {
    showMessage(this,"Echec de connexion au wallet")
  }

  disconnect(){
    showMessage(this,"Deconnexion");
    this.addr="";
  }
}
