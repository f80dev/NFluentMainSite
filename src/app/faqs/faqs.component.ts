import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NetworkService} from "../network.service";
import {environment} from "../../environments/environment";
import {getParams} from "../../tools";


export interface FAQ {
  title: string
  format: "html" | "text"
  content: string
  index: string
  visible: boolean
}

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements AfterContentInit {



  faqs:FAQ[]=[];
  @Input() filter="";
  @Input() title="Questions fréquentes";

  constructor(public network:NetworkService,
              public _location:Location,
              public route:ActivatedRoute) {
  }

  ngAfterContentInit(): void {
    getParams(this.route).then((params:any)=>{
      this.network.getfaqs().subscribe((rc:any)=>{
        this.faqs=[];

        for(let faq of rc.content) {
          if (!params.hasOwnProperty("open") || faq["index"].indexOf(params.get("open")) > -1) {
            faq.visible = params.hasOwnProperty("open");

            for(let i=0;i<5;i++){
              faq.title=faq.title.replace("{{appname}}",environment.appname);
              faq.content=faq.content.replace("{{appname}}",environment.appname);
            }

            if(this.filter.length==0 || this.filter.indexOf(faq.index)>-1){
              this.faqs.push(faq);
            }
          }
        }
      })
    });
    }



}