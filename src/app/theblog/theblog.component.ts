import { Component, OnInit } from '@angular/core';
import {getParams, showError, showMessage} from "../../tools";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import * as fs from "fs";
import {parse} from 'yaml'
import {NetworkService} from "../network.service";

interface Article {
  title: string
  visual: string
  online: boolean
  text: string
}

@Component({
  selector: 'app-theblog',
  templateUrl: './theblog.component.html',
  styleUrls: ['./theblog.component.css']
})
export class TheblogComponent implements OnInit {

  addr="";
  nfts_necessaires=['NFLUENTA-af9ddf'];
  articles: Article[]=[];

  constructor(public toast:MatSnackBar,public routes:ActivatedRoute,public network:NetworkService) {
    this.network.getyaml("http://./assets/articles.yaml").subscribe((result:any)=>{
      this.articles=result.articles;
    },(err)=>{showError(this,err)})
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
    open(environment.tokenfactory+"/cm?param=YWlyZHJvcD1mYWxzZSZ0b29sYmFyPWZhbHNlJm9wZT1uZmx1ZW50X2FjY2Vzc19jYXJk","store");
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
