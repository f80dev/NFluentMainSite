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
    //checkoutForm = this.formBuilder.group({name: '',      message: '',      subject:'',      email:''});
  }




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
    let encrypt_param="YXBwbmFtZT1ORmx1ZW5UJTIwRGVzaWduZXImYmFja2dyb3VuZD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZwYXBlcjEuanBnJmNsYWltPUNyJUMzJUE5ZXIlMjB2b3MlMjBzJUMzJUE5cmllcyUyMGVuJTIwcXVlbHF1ZXMlMjBjbGljcyZjb21tZW50PWI2NCUzQWJuVnNiQSUzRCUzRCZmYXZpY29uPWZhdmljb24ucG5nJm1hcnF1ZT1OZmx1ZW50Jm5ldHdvcmtzPSUyMCZzdG9ja2FnZT1uZnRzdG9yYWdlJnN0eWxlPW5mbHVlbnQtZGFyay10aGVtZS5jc3MmdG9vbGJhcj1mYWxzZSZ1cmw9aHR0cHMlM0ElMkYlMkZ0b2tlbmZvcmdlLm5mbHVlbnQuaW8lMkZjcmVhdG9yJnZpc3VhbD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZkZXNpZ24uanBnJnRpdGxlPU5GbHVlblQlMjBEZXNpZ25lcg%3D%3D"
    open("https://tokenforge.nfluent.io/creator?p="+encrypt_param)
  }

  open_tokendoc() {
    let encrypt_param="YXBpX2tleV9kb2N1bWVudD1naXRodWJfcGF0XzExQVpKRjdYUTB0TkpVbnRQUWJIeUVfeGw2Qkt5ZjBHd2RDb0RLSWQ5ajRBNmNzQzZITFBBazAwNERMRElqME9FZzdUVFJGQUNLNEdwbEREOWwmYXBwbmFtZT1Ub2tlbkRvYyZiYWNrZ3JvdW5kPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRmFzc2V0cyUyRnBhcGVyMS5qcGcmY2xhaW09U2lnbmV6JTIwdm9zJTIwZG9jdW1lbnRzJTIwZW4lMjAzJTIwY2xpY2tzJmNvbGxlY3Rpb249TUFDT0wwWEYtZjUzMTAxJmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmZhdmljb249aHR0cHMlM0ElMkYlMkZ3d3cuc2hhcmVpY29uLm5ldCUyRmRhdGElMkYyNTZ4MjU2JTJGMjAxNiUyRjA3JTJGMDYlMkY3OTE3MTBfZG9jdW1lbnRfNTEyeDUxMi5wbmcmZmlhdF9wcmljZT0xJm1hcnF1ZT1OZmx1ZW50Jm1lcmNoYW50LmNvbnRhY3Q9Y29udGFjdCU0MG5mbHVlbnQuaW8mbWVyY2hhbnQuY291bnRyeT1GUiZtZXJjaGFudC5jdXJyZW5jeT1FVVImbWVyY2hhbnQuaWQ9QkNSMkRONFRZRDRaNVhDUiZtZXJjaGFudC5uYW1lPU5mbHVlbnQlMjBTdG9yZSZtZXJjaGFudC53YWxsZXQuYWRkcmVzcz1lcmQxZ2tkNmY4d203OXYzZnN5eWtscDJxa2hxMGVlazI4Y25yNGpoajloODd6d3F4d2R6N3V3c3RkemozbSZtZXJjaGFudC53YWxsZXQubmV0d29yaz1lbHJvbmQtZGV2bmV0Jm1lcmNoYW50LndhbGxldC50b2tlbj1ORkxVQ09JTi00OTIxZWQmbWVyY2hhbnQud2FsbGV0LnVuaXR5PU5mbHVDb2luJm1pbmVyPWR1ZHVsZSUzQSUyMFowRkJRVUZCUW10aGNVeHJWbGRXUzNkTmRVYzJPV3AyZVVkMlgwUnJUVGhuYzNaNVVrNUlVbHBSTW5WZlJrOUZlazVVTUhsRFQybEdVMFZ0YmpkeGNtVldWVk5vYVVWTVFuZE1iVVZhZW5GdlkyOW5iV2hRUTFwalVFSjZhbFZMYUVsbWVtMHpTREpEZUhZeldVUmZhVkpwU1cxRlNFVlpORmw0UzJoS1NWZGFhbFJGVkUxZk1FSnphbTEzUXpsbGJrVktNalZZT1dwNFQxOTVSbmhVU2xBekxXWjJUa3RRVG1WdGQxUnZla05TVjBoQmRXVlpQUSUzRCUzRCZuZXR3b3Jrcz1lbHJvbmQtZGV2bmV0JnByaWNlPTImc3RvY2thZ2U9bmZsdWVudC1zZXJ2ZXImc3RvY2thZ2VfZG9jdW1lbnQ9bmZsdWVudC1zZXJ2ZXImc3R5bGU9bmZsdWVudC1kYXJrLXRoZW1lLmNzcyZ0b29sYmFyPWZhbHNlJnVybD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkYlM0ZnbyUzRHRva2VuZG9jJnZpc3VhbD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZzaWduYXR1cmUuanBnJnRpdGxlPVRva2VuRG9j"
    open("https://nfluent.io/tokendoc?p=")
    this.router.navigate(["tokendoc"], {queryParams: {p:encrypt_param}});
  }

  open_nftlive() {
    let encrypt_param="YXBpX2tleV9kb2N1bWVudD1naXRodWJfcGF0XzExQVpKRjdYUTB0TkpVbnRQUWJIeUVfeGw2Qkt5ZjBHd2RDb0RLSWQ5ajRBNmNzQzZITFBBazAwNERMRElqME9FZzdUVFJGQUNLNEdwbEREOWwmYXBwbmFtZT1ORlRsaXZlJTIwZm9yJTIwTXVsdGl2ZXJzWCZiYWNrZ3JvdW5kPWh0dHBzJTNBJTJGJTJGbmZ0bGl2ZS5uZmx1ZW50LmlvJTJGYXNzZXRzJTJGd29vZC5qcGcmY2xhaW09VHJhbnNmb3JtZXIlMjB2b3MlMjBwaG90b3MlMjBlbiUyME5GVCZjb2xsZWN0aW9uPURFVlBJQ1M0LWExYWMxNCZjb21tZW50PWI2NCUzQWJuVnNiQSUzRCUzRCZjb25maWc9aHR0cHMlM0ElMkYlMkZuZnRsaXZlLm5mbHVlbnQuaW8lMkZhc3NldHMlMkZjb25maWdfbmZ0bGl2ZV9mb3JfbXZ4LnlhbWwmZXhpc3RpbmdfYWNjb3VudF9tYWlsPWh0dHBzJTNBJTJGJTJGbmZ0bGl2ZS5uZmx1ZW50LmlvJTJGYXNzZXRzJTJGZXhpc3RpbmdfYWNjb3VudF93YWxsZXRfYWNjZXNzLmh0bWwmZmF2aWNvbj1mYXZpY29uLnBuZyZmaWF0X3ByaWNlPTAmbWFycXVlPU5mbHVlbnQmbWVyY2hhbnQuY29udGFjdD1jb250YWN0JTQwbmZsdWVudC5pbyZtZXJjaGFudC5uYW1lPU5mbHVlbnQlMjBTdG9yZSZtaW5lcj1kdWR1bGUlM0ElMjBaMEZCUVVGQlFtdGhjVXhyVmxkV1MzZE5kVWMyT1dwMmVVZDJYMFJyVFRobmMzWjVVazVJVWxwUk1uVmZSazlGZWs1VU1IbERUMmxHVTBWdGJqZHhjbVZXVlZOb2FVVk1RbmRNYlVWYWVuRnZZMjluYldoUVExcGpVRUo2YWxWTGFFbG1lbTB6U0RKRGVIWXpXVVJmYVZKcFNXMUZTRVZaTkZsNFMyaEtTVmRhYWxSRlZFMWZNRUp6YW0xM1F6bGxia1ZLTWpWWU9XcDRUMTk1Um5oVVNsQXpMV1oyVGt0UVRtVnRkMVJ2ZWtOU1YwaEJkV1ZaUFElM0QlM0QmbmV0d29ya3M9ZWxyb25kLWRldm5ldCZuZXdfYWNjb3VudF9tYWlsPWh0dHBzJTNBJTJGJTJGbmZ0bGl2ZS5uZmx1ZW50LmlvJTJGYXNzZXRzJTJGd2FsbGV0X2FjY2Vzcy5odG1sJnByaWNlPTAmcHJvbW90aW9uPXNwb25zb3IlM0RodHRwcyUzQSUyRiUyRm11bHRpdmVyc3guY29tJTBBcGFydGVuYWlyZSUzRGh0dHBzJTNBJTJGJTJGbmZsdWVudC5jb20mcm95YWx0aWVzPTAuMDUmc3RvY2thZ2U9bmZ0c3RvcmFnZSZzdG9ja2FnZV9kb2N1bWVudD1uZnRzdG9yYWdlJnN0eWxlPW5mbHVlbnQtZGFyay10aGVtZS5jc3MmdG9vbGJhcj1mYWxzZSZ1cmw9aHR0cHMlM0ElMkYlMkZuZnRsaXZlLm5mbHVlbnQuaW8lMkYmdmlzdWFsPWh0dHBzJTNBJTJGJTJGbmZ0bGl2ZS5uZmx1ZW50LmlvJTJGYXNzZXRzJTJGbG9nb19tdnguanBnJnRpdGxlPU5GVGxpdmUlMjBmb3IlMjBNdWx0aXZlcnNY";
    open("https://nftlive.nfluent.io/p="+encrypt_param);
  }

  open_faucet() {
    let encrypt_param="YXBwbmFtZT1GYXVjZXQlMjBkZXZuZXQmYmFja2dyb3VuZD1odHRwcyUzQSUyRiUyRm5mbHVlbnQuaW8lMkZhc3NldHMlMkZjYXNoX21hY2hpbmUuanBnJmJhbmsuaGlzdG89ZGItc2VydmVyLW5mbHVlbnQmYmFuay5saW1pdD01JmJhbmsubWluZXI9bmZsdWVudCUzQSUyMFowRkJRVUZCUW10aGNXVmlaa05LV0haWk5EaFlNVVI1TkhwQ1J6a3daMVV5VGtwNGRVbzVlQzF3ZFhKWFRGOXVlRFpuUm14YVZrSmpjalpEWldoR1VESTFhbE5SUm5NMVVrcHRVVUpmYUdZeE1qQXRUVGRSUkd0bmJFeEJhRmd5VlVFM2RWVnBRelJmVDFoalppMTZkWEV3UTNsd1R6QkxNMDVyV1haaFVIcFlWbE5UUkROSFdqRTJUalpsUlhOaFNsTkJTMTl2ZDBGSGJ6SmxhRWhuWjJaRmIzVmtPSGhGTnpSNVNtUlFiVEF0VWpWaGRYZFJQUSUzRCUzRCZiYW5rLm5ldHdvcms9ZWxyb25kLWRldm5ldCZiYW5rLnJlZnVuZD01JmJhbmsudGl0bGU9UmVjaGFyZ2VyJTIwZGVzJTIwTkZsdUNvaW4mYmFuay50b2tlbj1ORkxVQ09JTi00OTIxZWQmY2xhaW09UmVjaGFyZ2VtZW50JmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmZhdmljb249aHR0cHMlM0ElMkYlMkZuZmx1ZW50LmlvJTJGYXNzZXRzJTJGYmFua18yLmljbyZmaWF0X3ByaWNlPTAmbWFycXVlPU5mbHVlbnQmbWVyY2hhbnQuY29udGFjdD1jb250YWN0JTQwbmZsdWVudC5pbyZtZXJjaGFudC5uYW1lPU5mbHVlbnQlMjBTdG9yZSZtZXJjaGFudC53YWxsZXQubmV0d29yaz1lbHJvbmQtZGV2bmV0Jm1lcmNoYW50LndhbGxldC50b2tlbj1ORkxVQ09JTi00OTIxZWQmbWVyY2hhbnQud2FsbGV0LnVuaXR5PU5mbHVDb2luJnN0eWxlPW5mbHVlbnQteWVsbG93LXRoZW1lLmNzcyZ0b29sYmFyPWZhbHNlJnVybD1odHRwcyUzQSUyRiUyRnRva2VuZm9yZ2UubmZsdWVudC5pbyUyRmJhbmsmdmlzdWFsPWh0dHBzJTNBJTJGJTJGbmZsdWVudC5pbyUyRmFzc2V0cyUyRmJhbmsuYXZpZiZ0aXRsZT1GYXVjZXQlMjBkZXZuZXQ%3D"
    open("https://bank.nfluent.io/?p="+encrypt_param)
  }

  open_gallery() {
    let encrypt_param="YXBwbmFtZT1UaGUlMjBQdWJsaWMlMjBHYWxsZXJ5JTIwKGRldm5ldCkmYmFja2dyb3VuZD1odHRwcyUzQSUyRiUyRmdhbGxlcnkubmZsdWVudC5pbyUyRmFzc2V0cyUyRnJlZHdhbGwxLmpwZyZjYW5DaGFuZ2U9dHJ1ZSZjbGFpbT1FeHBvc2VyJTIwdm9zJTIwTkZUcyZjb21tZW50PWI2NCUzQWJuVnNiQSUzRCUzRCZkdXJhdGlvbj0zJmZhdmljb249aHR0cHMlM0ElMkYlMkZnYWxsZXJ5Lm5mbHVlbnQuaW8lMkZhc3NldHMlMkZwYWxldHRlLndlYnAmbWFycXVlPU5mbHVlbnQmbmV0d29ya3M9ZWxyb25kLWRldm5ldCZxdW90YT0xJnNob3dOZmx1ZW50V2FsbGV0Q29ubmVjdD10cnVlJnN0eWxlPW5mbHVlbnQtZGFyay10aGVtZS5jc3MmdG9vbGJhcj1mYWxzZSZ1cmw9aHR0cHMlM0ElMkYlMkZnYWxsZXJ5Lm5mbHVlbnQuaW8mdmlzdWFsPWh0dHBzJTNBJTJGJTJGZ2FsbGVyeS5uZmx1ZW50LmlvJTJGYXNzZXRzJTJGbXVzZWUuanBnJnRpdGxlPVRoZSUyMFB1YmxpYyUyMEdhbGxlcnklMjAoZGV2bmV0KQ%3D%3D"
    open("https://gallery.nfluent.io/?p="+encrypt_param)
  }

  open_poh() {
    this.router.navigate(["poh"])
  }

  open_apps() {
    this.router.navigate(["apps"],{queryParams:{filter:"*"}})
  }
}
