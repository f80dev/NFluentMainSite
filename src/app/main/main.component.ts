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
    let encrypt_param="YXBpX2tleV9kb2N1bWVudD1naHBfTll1SmZMN2JjQ3Z2cUNmR1ZqcERPUWJWZnFQRGxGNEI2RWJ3JmFwcG5hbWU9Q3IlQzMlQTlhdGlvbiUyMGRlcyUyME5GVCUyMHNhbnMlMjBtaW5hZ2UmY29tbWVudD1iNjQlM0FiblZzYkElM0QlM0QmbmV0d29ya3M9JTIwJnN0b2NrYWdlPW5mdHN0b3JhZ2Umc3RvY2thZ2VfZG9jdW1lbnQ9Z2l0aHViLW5mbHVlbnRkZXYtc3RvcmFnZV8xLW1haW4mdG9vbGJhcj1mYWxzZSZ1cmw9aHR0cHMlM0ElMkYlMkZ0b2tlbmZvcmdlLm5mbHVlbnQuaW8lMkZjcmVhdG9yJnZpc3VhbD1odHRwcyUzQSUyRiUyRmltYWdlcy51bnNwbGFzaC5jb20lMkZwaG90by0xNTk2NTY3MTgxNzIzLWJhN2QxNWVhY2VmYiUzRml4bGliJTNEcmItNC4wLjMlMjZpeGlkJTNETW53eE1qQTNmREI4TUh4elpXRnlZMmg4TVRKOGZIQmhhVzUwWlhKOFpXNThNSHg4TUh4OCUyNmF1dG8lM0Rmb3JtYXQlMjZmaXQlM0Rjcm9wJTI2dyUzRDUwMCUyNnElM0Q2MSZ0aXRsZT1DciVDMyVBOWF0aW9uJTIwZGVzJTIwTkZUJTIwc2FucyUyMG1pbmFnZQ%3D%3D"
    open("https://tokenforge.nfluent.io/creator?p="+encrypt_param)
  }

  open_tokendoc() {
    let encrypt_param="YXBpX2tleV9kb2N1bWVudD1naHBfTll1SmZMN2JjQ3Z2cUNmR1ZqcERPUWJWZnFQRGxGNEI2RWJ3JmFwcG5hbWU9VG9rZW5Eb2MmY2xhaW09U2lnbmV6JTIwdm9zJTIwZG9jdW1lbnRzJTIwZW4lMjAzJTIwY2xpY2tzJmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmZpYXRfcHJpY2U9MSZtZXJjaGFudC5jb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJm1lcmNoYW50LmNvdW50cnk9RlImbWVyY2hhbnQuY3VycmVuY3k9RVVSJm1lcmNoYW50LmlkPUJDUjJETjRUWUQ0WjVYQ1ImbWVyY2hhbnQubmFtZT1OZmx1ZW50JTIwU3RvcmUmbWVyY2hhbnQud2FsbGV0LmFkZHJlc3M9ZXJkMWdrZDZmOHdtNzl2M2ZzeXlrbHAycWtocTBlZWsyOGNucjRqaGo5aDg3endxeHdkejd1d3N0ZHpqM20mbWVyY2hhbnQud2FsbGV0Lm5ldHdvcms9ZWxyb25kLWRldm5ldCZtZXJjaGFudC53YWxsZXQudG9rZW49TkZMVUNPSU4tNDkyMWVkJm1lcmNoYW50LndhbGxldC51bml0eT1OZmx1Q29pbiZuZXR3b3Jrcz1lbHJvbmQtZGV2bmV0JnByaWNlPTImc2VsX2NvbD1NQUNPTDBYRi1mNTMxMDEmc2VsX2tleT1kdWR1bGUlM0ElMjBaMEZCUVVGQlFtdFdVVWRFYTJGQ2RIZFZlSFJuYUZsc1JEVmxNVUpIYkRsRVdpMHRWbFZqTUdGNFFtazJWV3BqYlhkMUxXMUpRM3BvUXpNdGJGTjJZemR0VDNCTFNrOVBZMmd4UkVsQkxURlhZbFowTlRkdmFrSTNOWFZKVWpOM1NVVnhTME4zUTNsUWExRjVla3M0Vm1oTlowcDJRV0ptTjNZM2JWOWxWWFZpUm1kWFNGSlRXakJRTjBwV09WOXZXSE5VV0dOb04wbE1SRkIxZERJM1RGQjNPSHAxZHpBeFdtcGhTbmhYTFVGUmEycEdYM1ZZTUhsUE1UUjBUVFozTVhGWWNWSkRha1Z4ZW5KR2JHbFpZbTA1TW5kUFZYbzVRMncwVTA1cWRHTTVTMjl4TVdkeVJtdElXbEZvUTNoS1RFWXRNVmRmVGs4NU0yTnNWMk5LV2xSVldrRkllRUpOZFdrd1NHRm5hR3BaVlZCQlRGTlhNbWxCZVdoUFh6VkhUM2hUVlVZelJrSXhRVmxZUWt4eWFGY3hVVXBJUWtkbFN6bFZla2c0UWpJd1dXTkRTa1ZMWlVsS1UyTkZWblZtZEhkc01qUkVNbFZwT1ZwVVdFOTFTSEZPYzJoSVVuZGlTVXRVUVZCWFJESmhOWEV3ZG1GamJDMUNjRTkwVlZsWVV6VnJlbFJIYnpsQ1RtWnZkVFZoVEhNd1FTMURPR3R2ZEdoSlJWRTVja1JSWDFsaVJIcFlNRVpTTnprdGRGWktlRU5KYW10U2RUQm1OVGg2T1ZWVFNWZFlVRXRZY1hrMlVHVnVVQSUzRCUzRCZzdG9ja2FnZT1uZnRzdG9yYWdlJnN0b2NrYWdlX2RvY3VtZW50PWdpdGh1Yi1uZmx1ZW50ZGV2LXN0b3JhZ2VfMi1tYWluJnRvb2xiYXI9ZmFsc2UmdXJsPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRnRva2VuZG9jJTJGJnZpc3VhbD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZzaWduYXR1cmUuanBnJnRpdGxlPVRva2VuRG9j";
    this.router.navigate(["tokendoc"], {queryParams: {p:encrypt_param}});
  }

    open_nftlive() {
      let encrypt_param="YXBpX2tleV9kb2N1bWVudD1naHBfTll1SmZMN2JjQ3Z2cUNmR1ZqcERPUWJWZnFQRGxGNEI2RWJ3JmFwcG5hbWU9TkZUbGl2ZSUyMERldm5ldCZjbGFpbT1UcmFuc2Zvcm1lciUyMHZvcyUyMHBob3RvcyUyMGVuJTIwTkZUJmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmZpYXRfcHJpY2U9MSZtZXJjaGFudC5jb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJm1lcmNoYW50LmNvdW50cnk9RlImbWVyY2hhbnQuY3VycmVuY3k9RVVSJm1lcmNoYW50LmlkPUJDUjJETjRUWUQ0WjVYQ1ImbWVyY2hhbnQubmFtZT1OZmx1ZW50JTIwU3RvcmUmbWVyY2hhbnQud2FsbGV0LmFkZHJlc3M9ZXJkMWdrZDZmOHdtNzl2M2ZzeXlrbHAycWtocTBlZWsyOGNucjRqaGo5aDg3endxeHdkejd1d3N0ZHpqM20mbWVyY2hhbnQud2FsbGV0Lm5ldHdvcms9ZWxyb25kLWRldm5ldCZtZXJjaGFudC53YWxsZXQudG9rZW49TkZMVUNPSU4tNDkyMWVkJm1lcmNoYW50LndhbGxldC51bml0eT1OZmx1Q29pbiZuZXR3b3Jrcz1lbHJvbmQtZGV2bmV0JnByaWNlPTImc2VsX2NvbD1NQUNPTDBYRi1mNTMxMDEmc2VsX2tleT1uZmx1ZW50JTNBJTIwWjBGQlFVRkJRbXRXYXpKSVRIaDFTVXRaWm1scVdsTk5lRFZJZGxKMFpWUlVkMWxsY0RsYVh6WXdhalZ0WWtKUlVFSXhURmRCUjBOdGFYUlFWbFJrY2psR1RHeERPV3BPTTFvM1RuZGpNR1p4TlV4T01tdzNPREprWms0NU9GcHVWazlwVDFkZk9HMTZiMlZzU0VkTFlUUm9UMlpqV25sR1NEbFVRelJ2V0RORWRIQlhOblZuT1VKYVIxUjNWamxVUm5VMU5uUjNhamhUZUdFM1gxOUZNM2N0VjNCbmFXcE5WM05RTmpGclpXMURRazF4YTFoeFltVnFURGRKWjJNemNFSkJSRWQ0WVc5d1ptazBaVFUwV0hObllucFZkbGMwWjJaTWMwZDNha05sVVRsUFRHWnllRloyV2xWUFFsVk1MWGMxTkdwS1dWSlBXSGt3Y0hOQ2JsRlBPVGhUUmpWZlpUZHJNVXBNU1ZSc05rZGhWVGQ2VDBndFNFbExZMHcwTm1Kb09GVXdja2htT0V3MGJFYzRXR2swT1dWUk1WQTNRVVkwTm1FM2NIaFBibmxNT0RkVWJsZ3RSbmRRVm10SlRrSjBWalJOVlVkTmRIRmFPR2xhUlhGdVZsQk5lbVJEUVhSc2NUWnNiVlZ3ZUZGZlQwTjNPSE4zWDBvemRIZHhWRmw0V0d4WVp6VmhVMTg0ZUhOUWRURkhiMEpLTkhORmJrWkdjM2xyZEZGaFVsWjRTbGx5UVRWMllXeG5aSE5wUzFGU1MxTmpSbGRCVjFKUlRVUkxkR1Z3VUhGdVpYUndTbmRpV1ElM0QlM0Qmc3RvY2thZ2U9bmZ0c3RvcmFnZSZzdG9ja2FnZV9kb2N1bWVudD1naXRodWItbmZsdWVudGRldi1zdG9yYWdlXzQtbWFpbiZ0b29sYmFyPWZhbHNlJnVybD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZuZnRsaXZlJnZpc3VhbD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZjYW1lcmEuanBnJnRpdGxlPU5GVGxpdmUlMjBEZXZuZXQ%3D%3D";
      this.router.navigate(["nftlive"], {queryParams: {p:encrypt_param}});
    }

  open_faucet() {
    let encrypt_param="YXBwbmFtZT1GYXVjZXQlMjBkZXZuZXQmY2xhaW09UmVjaGFyZ2VtZW50JmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmZpYXRfcHJpY2U9MSZtZXJjaGFudC5jb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJm1lcmNoYW50LmNvdW50cnk9RlImbWVyY2hhbnQuY3VycmVuY3k9RVVSJm1lcmNoYW50LmlkPUJDUjJETjRUWUQ0WjVYQ1ImbWVyY2hhbnQubmFtZT1OZmx1ZW50JTIwU3RvcmUmbWVyY2hhbnQud2FsbGV0LmJhbms9bmZsdWVudCUzQSUyMFowRkJRVUZCUW10WGNIUmFYemRwWkdWME15MVRVbFJwTTJkSmRtRmZia3hUZDI5SmIyODRWRlZzZEhscGJYbHVRek50Ymt0bFJWcEhSWFZrTkRSQ1pYRnNTVTA1YTJzNFZtUldjbkJ2YjNaU1IySjZkbmRWZW1WNllraDFVR2xuZW5KU04wRXdlbGxTWTBSM1VsUlVZVWx0ZFdFMldtdFJYeTFvZFhWaGVDMVpNVlE0VlVsUVptUnJTMnRRZGpCMk1YTkxVekJJWDJsVFRqWk1UREZFV1hKUU5WWkRVWFZXVHkxdVNrc3dhbkI0VjA5UE5IZHpQUSUzRCUzRCZtZXJjaGFudC53YWxsZXQubmV0d29yaz1lbHJvbmQtZGV2bmV0Jm1lcmNoYW50LndhbGxldC50b2tlbj1ORkxVQ09JTi00OTIxZWQmbWVyY2hhbnQud2FsbGV0LnVuaXR5PU5mbHVDb2luJnRvb2xiYXI9ZmFsc2UmdXJsPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRmJhbmsmdGl0bGU9RmF1Y2V0JTIwZGV2bmV0"
    this.router.navigate(["bank"], {queryParams: {p:encrypt_param}});
  }
}
