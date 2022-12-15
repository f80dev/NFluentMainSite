import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {getParams} from "../tools";
import {NetworkService} from "./network.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(public routes:ActivatedRoute,public network:NetworkService) {
  }

  ngOnInit(): void {
    getParams(this.routes).then((params:any)=>{
      if(params.hasOwnProperty("server"))this.network.server_nfluent=params.server;
    })
  }

}
