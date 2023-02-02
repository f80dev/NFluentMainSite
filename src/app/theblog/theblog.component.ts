import { Component, OnInit } from '@angular/core';
import {getParams, showError, showMessage} from "../../tools";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {NetworkService} from "../network.service";

interface Article {
  title: string
  visual: string
  online: boolean
  url: string
  color: string
  content: string
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

  }

  ngOnInit(): void {
    getParams(this.routes).then((params:any)=>{
      this.network.getyaml("https://raw.githubusercontent.com/nfluentdev/LeBlogNFluent/main/articles.yaml").subscribe((result:any)=>{
        this.articles=result.articles;
      },(err)=>{showError(this,err)})
      if(params.hasOwnProperty("nfts"))this.nfts_necessaires=params["nfts"].split(",");
      if(params.hasOwnProperty("addr"))this.addr=params["addr"];
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
    open(environment.tokenfactory+"/cm?param=YWlyZHJvcD1mYWxzZSZ0b29sYmFyPWZhbHNlJm9wZT1iNjQlM0FhSFIwY0hNNkx5OXlZWGN1WjJsMGFIVmlkWE5sY21OdmJuUmxiblF1WTI5dEwyNW1iSFZsYm5Sa1pYWXZkRzlyWlc1bWIzSm5aUzl0WVdsdUwyNW1iSFZsYm5SZllXTmpaWE56WDJOaGNtUXVlV0Z0YkElM0QlM0QmdmlzdWFsPWI2NCUzQWJuVnNiQSUzRCUzRCZjbGFpbT1iNjQlM0FiblZzYkElM0QlM0QmYXBwbmFtZT1iNjQlM0FiblZzYkElM0QlM0Q%3D","store");
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

  open_article(article: Article) {
    open(article.url,"article");
  }
}
