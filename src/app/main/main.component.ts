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


  open_create() {
    let encrypt_param="YXBpX2tleV9kb2N1bWVudD1naXRodWJfcGF0XzExQVpKRjdYUTB0TkpVbnRQUWJIeUVfeGw2Qkt5ZjBHd2RDb0RLSWQ5ajRBNmNzQzZITFBBazAwNERMRElqME9FZzdUVFJGQUNLNEdwbEREOWwmYXBwbmFtZT1DciVDMyVBOWF0aW9uJTIwZGVzJTIwTkZUJTIwYXZlYyUyMG1pbmFnZSZjbGFpbT1DciVDMyVBOWV6JTIwc2ltcGxlbWVudCUyMGRlcyUyMGNvbGxlY3Rpb25zJTIwZGUlMjBORlQmY29tbWVudD1iNjQlM0FiblZzYkElM0QlM0QmZmlhdF9wcmljZT0xJm1lcmNoYW50LmNvbnRhY3Q9Y29udGFjdCU0MG5mbHVlbnQuaW8mbWVyY2hhbnQuY291bnRyeT1GUiZtZXJjaGFudC5jdXJyZW5jeT1FVVImbWVyY2hhbnQuaWQ9QkNSMkRONFRZRDRaNVhDUiZtZXJjaGFudC5uYW1lPU5mbHVlbnQlMjBTdG9yZSZtZXJjaGFudC53YWxsZXQuYWRkcmVzcz1lcmQxZ2tkNmY4d203OXYzZnN5eWtscDJxa2hxMGVlazI4Y25yNGpoajloODd6d3F4d2R6N3V3c3RkemozbSZtZXJjaGFudC53YWxsZXQubmV0d29yaz1lbHJvbmQtZGV2bmV0Jm1lcmNoYW50LndhbGxldC50b2tlbj1ORkxVQ09JTi00OTIxZWQmbWVyY2hhbnQud2FsbGV0LnVuaXR5PU5mbHVDb2luJm5ldHdvcmtzPWVscm9uZC1kZXZuZXQlMkNwb2x5Z29uLWRldm5ldCUyQ2Rhby1uZmx1ZW50LXNlcnZlciZwcmljZT0yJnNlbF9jb2w9TUFDT0wwWEYtZjUzMTAxJnNlbF9rZXk9ZHVkdWxlJTNBJTIwWjBGQlFVRkJRbXRXVVVkRWEyRkNkSGRWZUhSbmFGbHNSRFZsTVVKSGJEbEVXaTB0VmxWak1HRjRRbWsyVldwamJYZDFMVzFKUTNwb1F6TXRiRk4yWXpkdFQzQkxTazlQWTJneFJFbEJMVEZYWWxaME5UZHZha0kzTlhWSlVqTjNTVVZ4UzBOM1EzbFFhMUY1ZWtzNFZtaE5aMHAyUVdKbU4zWTNiVjlsVlhWaVJtZFhTRkpUV2pCUU4wcFdPVjl2V0hOVVdHTm9OMGxNUkZCMWRESTNURkIzT0hwMWR6QXhXbXBoU25oWExVRlJhMnBHWDNWWU1IbFBNVFIwVFRaM01YRlljVkpEYWtWeGVuSkdiR2xaWW0wNU1uZFBWWG81UTJ3MFUwNXFkR001UzI5eE1XZHlSbXRJV2xGb1EzaEtURVl0TVZkZlRrODVNMk5zVjJOS1dsUlZXa0ZJZUVKTmRXa3dTR0ZuYUdwWlZWQkJURk5YTW1sQmVXaFBYelZIVDNoVFZVWXpSa0l4UVZsWVFreHlhRmN4VVVwSVFrZGxTemxWZWtnNFFqSXdXV05EU2tWTFpVbEtVMk5GVm5WbWRIZHNNalJFTWxWcE9WcFVXRTkxU0hGT2MyaElVbmRpU1V0VVFWQlhSREpoTlhFd2RtRmpiQzFDY0U5MFZWbFlVelZyZWxSSGJ6bENUbVp2ZFRWaFRITXdRUzFET0d0dmRHaEpSVkU1Y2tSUlgxbGlSSHBZTUVaU056a3RkRlpLZUVOSmFtdFNkVEJtTlRoNk9WVlRTVmRZVUV0WWNYazJVR1Z1VUElM0QlM0Qmc3RvY2thZ2U9bmZ0c3RvcmFnZSZzdG9ja2FnZV9kb2N1bWVudD1naXRodWItbmZsdWVudGRldi1zdG9yYWdlXzEtbWFpbiZ0b29sYmFyPWZhbHNlJnVybD1odHRwcyUzQSUyRiUyRnRva2VuZm9yZ2UubmZsdWVudC5pbyUyRmNyZWF0b3ImdmlzdWFsPWh0dHBzJTNBJTJGJTJGaW1hZ2VzLnVuc3BsYXNoLmNvbSUyRnBob3RvLTE1OTY1NjcxODE3MjMtYmE3ZDE1ZWFjZWZiJTNGaXhsaWIlM0RyYi00LjAuMyUyNml4aWQlM0RNbnd4TWpBM2ZEQjhNSHh6WldGeVkyaDhNVEo4ZkhCaGFXNTBaWEo4Wlc1OE1IeDhNSHg4JTI2YXV0byUzRGZvcm1hdCUyNmZpdCUzRGNyb3AlMjZ3JTNENTAwJTI2cSUzRDYwJnRpdGxlPUNyJUMzJUE5YXRpb24lMjBkZXMlMjBORlQlMjBhdmVjJTIwbWluYWdl"
    open("https://tokenforge.nfluent.io/creator?p="+encrypt_param)
  }

  open_tokendoc() {
    let encrypt_param="YXBpX2tleV9kb2N1bWVudD1naXRodWJfcGF0XzExQVpKRjdYUTB0TkpVbnRQUWJIeUVfeGw2Qkt5ZjBHd2RDb0RLSWQ5ajRBNmNzQzZITFBBazAwNERMRElqME9FZzdUVFJGQUNLNEdwbEREOWwmYXBwbmFtZT1Ub2tlbkRvYyZjbGFpbT1TaWduZXolMjB2b3MlMjBkb2N1bWVudHMlMjBlbiUyMDMlMjBjbGlja3MmY29tbWVudD1iNjQlM0FiblZzYkElM0QlM0QmZmlhdF9wcmljZT0xJm1lcmNoYW50LmNvbnRhY3Q9Y29udGFjdCU0MG5mbHVlbnQuaW8mbWVyY2hhbnQuY291bnRyeT1GUiZtZXJjaGFudC5jdXJyZW5jeT1FVVImbWVyY2hhbnQuaWQ9QkNSMkRONFRZRDRaNVhDUiZtZXJjaGFudC5uYW1lPU5mbHVlbnQlMjBTdG9yZSZtZXJjaGFudC53YWxsZXQuYWRkcmVzcz1lcmQxZ2tkNmY4d203OXYzZnN5eWtscDJxa2hxMGVlazI4Y25yNGpoajloODd6d3F4d2R6N3V3c3RkemozbSZtZXJjaGFudC53YWxsZXQuYmFuaz1odHRwcyUzQSUyRiUyRnRva2VuZm9yZ2UubmZsdWVudC5pbyUyRmJhbmsmbWVyY2hhbnQud2FsbGV0Lm5ldHdvcms9ZWxyb25kLWRldm5ldCZtZXJjaGFudC53YWxsZXQudG9rZW49TkZMVUNPSU4tNDkyMWVkJm1lcmNoYW50LndhbGxldC51bml0eT1OZmx1Q29pbiZuZXR3b3Jrcz1lbHJvbmQtZGV2bmV0JnByaWNlPTImc2VsX2NvbD1NQUNPTDBYRi1mNTMxMDEmc2VsX2tleT1kdWR1bGUlM0ElMjBaMEZCUVVGQlFtdFdVVWRFYTJGQ2RIZFZlSFJuYUZsc1JEVmxNVUpIYkRsRVdpMHRWbFZqTUdGNFFtazJWV3BqYlhkMUxXMUpRM3BvUXpNdGJGTjJZemR0VDNCTFNrOVBZMmd4UkVsQkxURlhZbFowTlRkdmFrSTNOWFZKVWpOM1NVVnhTME4zUTNsUWExRjVla3M0Vm1oTlowcDJRV0ptTjNZM2JWOWxWWFZpUm1kWFNGSlRXakJRTjBwV09WOXZXSE5VV0dOb04wbE1SRkIxZERJM1RGQjNPSHAxZHpBeFdtcGhTbmhYTFVGUmEycEdYM1ZZTUhsUE1UUjBUVFozTVhGWWNWSkRha1Z4ZW5KR2JHbFpZbTA1TW5kUFZYbzVRMncwVTA1cWRHTTVTMjl4TVdkeVJtdElXbEZvUTNoS1RFWXRNVmRmVGs4NU0yTnNWMk5LV2xSVldrRkllRUpOZFdrd1NHRm5hR3BaVlZCQlRGTlhNbWxCZVdoUFh6VkhUM2hUVlVZelJrSXhRVmxZUWt4eWFGY3hVVXBJUWtkbFN6bFZla2c0UWpJd1dXTkRTa1ZMWlVsS1UyTkZWblZtZEhkc01qUkVNbFZwT1ZwVVdFOTFTSEZPYzJoSVVuZGlTVXRVUVZCWFJESmhOWEV3ZG1GamJDMUNjRTkwVlZsWVV6VnJlbFJIYnpsQ1RtWnZkVFZoVEhNd1FTMURPR3R2ZEdoSlJWRTVja1JSWDFsaVJIcFlNRVpTTnprdGRGWktlRU5KYW10U2RUQm1OVGg2T1ZWVFNWZFlVRXRZY1hrMlVHVnVVQSUzRCUzRCZzdG9ja2FnZT1uZnRzdG9yYWdlJnN0b2NrYWdlX2RvY3VtZW50PWdpdGh1Yi1uZmx1ZW50ZGV2LXN0b3JhZ2VfMi1tYWluJnRvb2xiYXI9ZmFsc2UmdXJsPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRnRva2VuZG9jJTJGJnZpc3VhbD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZzaWduYXR1cmUuanBnJnRpdGxlPVRva2VuRG9j";
    this.router.navigate(["tokendoc"], {queryParams: {p:encrypt_param}});
  }

  open_nftlive() {
    let encrypt_param="";
    open("https://nflive.nfluent.io/bank");
  }

  open_faucet() {
    let encrypt_param="YW1vdW50PTUmYXBwbmFtZT1GYXVjZXQlMjBkZXZuZXQmY2xhaW09UmVjaGFyZ2VtZW50JmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmZpYXRfcHJpY2U9MCZtZXJjaGFudC5jb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJm1lcmNoYW50LmNvdW50cnk9RlImbWVyY2hhbnQuY3VycmVuY3k9RVVSJm1lcmNoYW50LmlkPUJDUjJETjRUWUQ0WjVYQ1ImbWVyY2hhbnQubmFtZT1OZmx1ZW50JTIwU3RvcmUmbWVyY2hhbnQud2FsbGV0LmJhbms9bmZsdWVudCUzQSUyMFowRkJRVUZCUW10WGNIUmFYemRwWkdWME15MVRVbFJwTTJkSmRtRmZia3hUZDI5SmIyODRWRlZzZEhscGJYbHVRek50Ymt0bFJWcEhSWFZrTkRSQ1pYRnNTVTA1YTJzNFZtUldjbkJ2YjNaU1IySjZkbmRWZW1WNllraDFVR2xuZW5KU04wRXdlbGxTWTBSM1VsUlVZVWx0ZFdFMldtdFJYeTFvZFhWaGVDMVpNVlE0VlVsUVptUnJTMnRRZGpCMk1YTkxVekJJWDJsVFRqWk1UREZFV1hKUU5WWkRVWFZXVHkxdVNrc3dhbkI0VjA5UE5IZHpQUSUzRCUzRCZtZXJjaGFudC53YWxsZXQubmV0d29yaz1lbHJvbmQtZGV2bmV0Jm1lcmNoYW50LndhbGxldC50b2tlbj1ORkxVQ09JTi00OTIxZWQmbWVyY2hhbnQud2FsbGV0LnVuaXR5PU5mbHVDb2luJnRvb2xiYXI9ZmFsc2UmdXJsPWh0dHBzJTNBJTJGJTJGdG9rZW5mb3JnZS5uZmx1ZW50LmlvJTJGYmFuayZ2aXN1YWw9aHR0cHMlM0ElMkYlMkZpbWFnZXMudW5zcGxhc2guY29tJTJGcGhvdG8tMTU2MjA2OTAyOC05MmYxMGUzN2FjOWQlM0ZpeGxpYiUzRHJiLTQuMC4zJTI2aXhpZCUzRE1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JTI2YXV0byUzRGZvcm1hdCUyNmZpdCUzRGNyb3AlMjZ3JTNENjg3JTI2cSUzRDgwJnRpdGxlPUZhdWNldCUyMGRldm5ldA%3D%3D"
    open("https://bank.nfluent.io/?p="+encrypt_param)
  }

  open_poh() {
    this.router.navigate(["poh"])
  }
}
