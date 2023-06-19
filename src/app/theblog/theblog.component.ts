import { Component, OnInit } from '@angular/core';
import {getParams, showError, showMessage} from "../../tools";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {NetworkService} from "../network.service";
import {Operation} from "../../operation";

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
  operation: Operation | undefined;

  constructor(public toast:MatSnackBar,
              public routes:ActivatedRoute,
              public network:NetworkService) {
  }

  ngOnInit(): void {
    getParams(this.routes).then((params:any)=>{
      this.network.getyaml("https://raw.githubusercontent.com/nfluentdev/LeBlogNFluent/main/articles.yaml").subscribe((result:any)=>{
        this.articles=result.articles;
      },(err)=>{showError(this,err)})
      this.network.get_operations("nfluent_access_card").subscribe((ope)=>{this.operation=ope;})
      if(params.hasOwnProperty("nfts"))this.nfts_necessaires=params["nfts"].split(",");
      if(params.hasOwnProperty("addr"))this.addr=params["addr"];
    })
  }



  authent(addr:string) {
    this.addr=addr;
    showMessage(this,"Ouverture du blog pour "+addr);
  }

  open_store(){
    let param="bmV0d29yaz1kYi1zZXJ2ZXItbmZsdWVudCZjb2xsZWN0aW9uPWNvbF82NDc2OGYyYjYyZDUzMjBjODY0NzQ2MjUmbWluZXI9WjBGQlFVRkJRbXRrYnkxeVUzTkxXVEJRYTBSZldtRk5VbUZzTlVwRk5rNHpjbG95WTB4cmRsOU5aMDVNV0ROdlMwUm5hRFYwTFcxa1pHbG9ObGxETUZreGRYTjFPRUppYVdsdGRYUlNVa3c0UkhaYWVEUnNTRzVpZEROWmVGcGZRekF4TWpSaE5tOWZibmx1UVhCNlZYUm5lbUp3TUhsSGJHNUdlWEJrTFVGbU1YcDBRbmN6TjBoemFVdHNTV05RY0RKVlQzTm5ZbHA0VkZkR2JVbHFOMWhxUkVKeFowd3ROM0pwYWt0d1IyRTNZa0Z1V1ZGRk1rTnJObTU1YTNWUlRHeHJRMU5IVEZnemJWaHFPRWwwY1daTGIxRkpiMlY1WkdGblYyaGtlbkp0TmkxdVowRlNNbk5EV0ZkSU1sZHNTbGxNT0ROamRrdGlNbXMwY0RKWWMwMU9XRFZzZGt3d1VEUkJaRGhsVEhsdGVXeEliMGgwVVZKaWJHNXJiRUkyZUZKUmRqUkJjRlJETTBkd1VuazNRVk5sZWpGU09IcHBSVUV3YUhWVlExbFpTMXA1UnpFdFlXNDFOWFZNVTBOWmNuSlpaVkZOUTNWMVIxRnpWRnBQYWxkUFQwaGxPRkJpYWpCM1ZqRlVabUpRZDJGUVJXeGFWV1Z1U21FM1FYUlRSMHhtZEdWblgxRmFYMkV6V1RoWkxUSnJSMXBSY2xBdFQxaFJRVk5MUVhoeVVUMDkmbmV0d29ya3M9ZWxyb25kLWRldm5ldCUyQ3BvbHlnb24tZGV2bmV0JTJDZGItc2VydmVyLW5mbHVlbnQmbWluZXJfZGVzdD1aMEZCUVVGQlFtdGtieTFOZWxKMlJFeEhNSGR6WmxKSlluaEtORVJHT0ZsQ0xTMTRialpRVjBsVmNVWllabkZJYjFad1pXbFNNREpyUlVGaU1YUlBaRWxETkU1TmFUZG1jMDVrUkU5b1NFNDVUa041UjA0dGFFUnpRVGxtWHpWdFMwVkZhWGw0Y0hKSFIxWmxWa3hOUVhSbGFFeFJUbXMwWDAxR2RWWnliM0pVVnpZeU5EbHVaVVo0YjBKdk9VODJWMDlzYUdKME9UZFFZekEyUVRWMFdVcExaa3hJT0hjdGNFMUJibU00YzJabWFtaG9XVzU2TWxBeFdqbFhTalJqTVZoTWFYVlRjREE1T0RnNVVXeElTblJRWVVsRllYcHpSRmxXWkVwSFVteGhVbk5LV1dKQ1VHUkRZVjgyY0U4NFlrOXdXSHBPZFhST2FrcFFZazQxUTBwdVRYcHlPRkJ0VEZGaVVtUklPVE5ZY0UxNk9UZG1RV2RJZDNOZk1GbERTbkJZWDJwdWQyY3djekl3UmxSQk1HaDJVSE5QWTFaT2VWbFBPRVpWTVV0UVZHbFhWVWwzU1VkdFVtSnpVa2x6WkhsemRteHZPVVp4YVVvd01HSldXR3RTTkhwQlpGQldlRWRwYXpSV2FFTmFZME5SWVdGUVUxSnNVMmh2UW1sUFZrVlROMkpmUTIxTFlqSlUmbmV0d29ya19kZXN0PWVscm9uZC1kZXZuZXQmY29sbGVjdGlvbl9kZXN0PU1BQ09MMFhGLWMwMWQ5OSZtaW5lcl9hZGRyPWRiXzlkZWYzYmZlNDlhZGZmMmY0NDUyOTk4NmM4MjM5MDI1NDAxYzU5YmE0MmJlY2U0ZDQ1NzEwNWE5ZTViMWYxOTkmdG9vbGJhcj1mYWxzZQ%253D%253D";
    open(environment.tokenfactory+"/cm?p="+param,"store");
  }


  fail(addr:string){
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
