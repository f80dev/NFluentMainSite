import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {getParams} from "../tools";
import {NetworkService} from "./network.service";

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
      public routes:ActivatedRoute,
      public router:Router,
      public network:NetworkService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-WDDVHR235S', { 'page_path': event.urlAfterRedirects });
      }
    })
  }

  ngOnInit(): void {
    getParams(this.routes).then((params:any)=>{
      if(params.hasOwnProperty("server"))this.network.server_nfluent=params.server;
      if(params.go){
        this.router.navigate([params.go]);
      }
    })
  }

}
