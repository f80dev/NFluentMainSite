import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {environment} from "../../environments/environment";
import {NetworkService} from "../network.service";
import {showMessage} from "../../tools";
import {DeviceService} from "../device.service";
import {StyleManagerService} from "../style-manager.service";
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
      private formBuilder: FormBuilder,
      public device:DeviceService,
      public theme:StyleManagerService
  ) {

  }

  ngOnInit(): void {
    this.theme.setStyle("theme","nfluent-theme.css")
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

  open_create() {
    let encrypt_param="dG9vbGJhcj1mYWxzZSZ0aXRsZV9mb3JtPUclQzMlQTluJUMzJUE5cmF0ZXVyJTIwZGUlMjB2aXN1ZWxzJTIwTkZUcyZjbGFpbT1GYWJyaXF1ZXIlMjB2b3MlMjBzJUMzJUE5cmllcyUyME5GVCUyMGVuJTIwcXVlbHF1ZXMlMjBtaW51dGVzJnZpc3VhbD1odHRwcyUzQSUyRiUyRmNkbi5waXhhYmF5LmNvbSUyRnBob3RvJTJGMjAxOCUyRjAyJTJGMDYlMkYyMiUyRjQzJTJGcGFpbnRpbmctMzEzNTg3NV85NjBfNzIwLmpwZyZhcHBuYW1lPVRva2VuRm9yZ2UlMjBEZXNpZ24mbmV0d29ya3M9YjY0JTNBVzEwJTNEJnN0b2NrYWdlPWI2NCUzQVd5SnVablJ6ZEc5eVlXZGxJbDAlM0Qmc3RvY2thZ2VfZG9jdW1lbnQ9YjY0JTNBV3lKbmFYUm9kV0l0Ym1ac2RXVnVkR1JsZGkxemRHOXlZV2RsTFcxaGFXNGlYUSUzRCUzRA%3D%3D"
    open("https://tokenforge.nfluent.io/creator?p="+encrypt_param)
  }

  open_tokendoc() {
    let encrypt_param="c3RvY2thZ2U9YjY0JTNBV3lKbmFYUm9kV0l0Ym1ac2RXVnVkR1JsZGkxemRHOXlZV2RsTFcxaGFXNGlYUSUzRCUzRCZzdG9ja2FnZV9kb2N1bWVudD1iNjQlM0FXeUpuYVhSb2RXSXRibVpzZFdWdWRHUmxkaTF6ZEc5eVlXZGxMVzFoYVc0aVhRJTNEJTNEJm5ldHdvcms9ZWxyb25kLWRldm5ldCZtaW5lcj0lMjBaMEZCUVVGQlFtdE5RakpZWVVGdlVUaHJZbE5CUVZWR2RWOVdVeTFSYlhWUE9YVnNOVEpJVkY5eFZrcFBhalozUW1kdmFEQTJTbTA1VFU5a1VqbFZjekZsUWpCaVZFRXlWRXhMWm5Rd2MzZGpPVWRxZGs0MWJUbE1VWGt4ZVhwc2FEaDNPVWRyVDNVd2NubGlTM1JMTnpOT05HUjNRbTVWTVhkbWNEbDJjREJyT0ZCeWFESXlNVFJPVERjMVZHNUlhM1JxV0ZkclNVNUhPV3A0WlZSMVgzbEZiRlYyZHpscVEzWllObmhuU21JeWNreFZYME5rUTFoM2FUbHhZbHBJZVd4SUxXTkliMmxZV21Oc1VpMXJNSFY1V1c5MllXZzFNSGxOZVZCMVdEYzJWM2MxZGpsWFJYQkJiRmx3WHpWSVJYbGlaMjVwVEhRMlVFdHJTbFZMZG5GM1kyZEdRMGd0ZUdGbU9XTTBORk5WU3pSek5VeFJjMUZKT0ZkYVFrZ3plVFZRYVRkYVUxcHZkVEY0WkdKeWIxRjFkbkJtZG1wUllXeHZSMDFwUmtkbFVIaHJTbmh3VlV4aFZHcDRlSE56Y2pSWlEwdGtRamt0Y2xaZlVrdGFNalExYTFNelIzbEJjelJIV0ZSd2VsQlVjakJMTTJkMVEzWnRTRlJPYW5jNVgzZHFMWFpwZEVOcmVYVk5TVUZwY0dWSVowNDBkVnBsY0ZWSVZYUlhaV042UjBaTVRGQjRaRzl4UjJ0SWFrdEJYMlpaV2pSYU0zWjRibk5EVjFsQ2JYcFJSRUUwU1U0MFNXaG1iQSUzRCUzRCZjbGFpbT1TaWduZXolMjB2b3MlMjBkb2N1bWVudHMlMjBlbiUyMDMlMjBjbGlja3MmYXBwbmFtZT1Ub2tlblNpZ24mY29sbGVjdGlvbj1NWUNPTDkzMS00MmU3MzE%3D";
    this.router.navigate(["tokendoc"], {queryParams: {p:encrypt_param}});
  }

    open_nftlive() {
      let encrypt_param="dG9vbGJhcj10cnVlJnRpdGxlX2Zvcm09TkZUTGl2ZSUyMERldm5ldCUyMEVkaXRpb24mY2xhaW09VHJhbnNmb3JtZXIlMjB2b3MlMjBwaG90b3MlMjBlbiUyME5GVCZ2aXN1YWw9aHR0cHMlM0ElMkYlMkZwaXhhYmF5LmNvbSUyRmdldCUyRmdiODQyYTdkZWMyMTcxMjNlYjA2ODlkNjQ5MWFmNzk2ZmE0ZTUwZDAxZjAwYzlmMDMyOGFjY2UyZWVkNzEyNmEyMzY1Y2E3NTllNDNjZDk3NDA2MTNmYjdiMzk4ZmExM2FfMTI4MC5qcGcmYXBwbmFtZT1ORlRsaXZlJTIwRGV2bmV0Jm5ldHdvcmtzPWVscm9uZC1kZXZuZXQlMkNwb2x5Z29uLWRldm5ldA%3D%3D";
      this.router.navigate(["nftlive"], {queryParams: {p:encrypt_param}});
    }
}
