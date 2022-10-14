import { Component, OnInit } from '@angular/core';
import {getParams, showMessage} from "../../tools";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-theblog',
  templateUrl: './theblog.component.html',
  styleUrls: ['./theblog.component.css']
})
export class TheblogComponent implements OnInit {

  addr="";
  nfts_necessaires=['NFLUENTA-ccc051','NFLUENTA-4fcc6c'];

  constructor(public toast:MatSnackBar,public routes:ActivatedRoute) {

  }

  ngOnInit(): void {
    getParams(this.routes).then((params:any)=>{
      if(params.hasOwnProperty("nfts"))this.nfts_necessaires=params["nfts"].split(",");
    })
  }

  authent(evt: {address:string,nftchecked:boolean,strong:boolean}) {
    if(!evt.strong){
      this.fail();
    }else{
      showMessage(this,"Ouverture du blog");
      this.addr=evt.address
    }
  }

  open_store(){
    open("https://tokenfactory.nfluent.io/cm?param=b3BlPU1haW5fZGV2bmV0JnRvb2xiYXI9ZmFsc2U%3D","store");
  }

  fail(){
    showMessage(this,"Authentification réussie mais vous ne possédez pas les NFT requis. En savoir plus ?",4000,()=>{
      this.open_store();
    });
  }

  cancel() {
    showMessage(this,"Echec de connexion au wallet")
  }

  disconnect(){
    showMessage(this,"Deconnexion");
    this.addr="";
  }
}
