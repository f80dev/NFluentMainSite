import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {environment} from "../../environments/environment";
import {NetworkService} from "../network.service";
import {showMessage} from "../../tools";
declare var anime: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit,OnInit {
  title = 'NFluentWebSite';
  name:any="";
  message: any="";
  subject="";
  email="";
  version: string="";

  constructor(
      public router:Router,
      public network:NetworkService,
      public routes:ActivatedRoute,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.routes.queryParams.subscribe((param)=>{
      if(param.hasOwnProperty("version")){
        this.version=param["version"];
      } else {
        this.version=environment.version;
      }
    })
    }

  checkoutForm = this.formBuilder.group({
    name: '',
    message: '',
    subject:'',
    email:''
  });



  init(){
    anime({
      targets: '.small-round',
      scale: {
        value:1.6,
        duration: 1,
        endDelay: 1000,
      },
      translateX: {
        value:60,
        duration: 1,
        endDelay: 1000,
      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.medium-round',
      scale: 0.5,
      translateX: {
        value:-150,
        duration: 1,
        endDelay: 1000,

      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.rounds-logo',
      rotate: {
        value:360,
        duration: 1,
        delay:2000
      },
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });
    this.play();
  }

  play(){
    anime({
      targets: '.small-round',
      scale: {
        value:1.6,
        duration: 2000,
        endDelay: 1000,
      },
      translateX: {
        value:60,
        duration: 2000,
        endDelay: 1000,
      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.medium-round',
      scale: {
        value:0.5,
        duration: 2000,
        endDelay: 1000,
      },
      translateX: {
        value:-150,
        duration: 2000,
        endDelay: 1000,

      },
      direction: 'alternate',
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    anime({
      targets: '.rounds-logo',
      rotate: {
        value:360,
        duration: 4000,
        delay:2000
      },
      easing: 'cubicBezier(.5, .05, .1, .3)'
    });
  }



  ngAfterViewInit(): void {
    this.play();
  }

  open_menu(idsection: string) {
    this.router.navigate(["/main"],{fragment: idsection});
  }

  send_message() {
    this.network.send_mail_to_contact(this.email,this.message,this.subject,this.name).subscribe(()=>{
      showMessage(this,"Message sended");
      this.message="";
      this.subject="";
    })
  }

    open_blog() {
        this.router.navigate(["blog"]);
    }

  open_theblog() {
    this.router.navigate(["theblog"]);
  }
}
