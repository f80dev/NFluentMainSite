import {Component, OnInit} from '@angular/core';
import {NetworkService} from "../network.service";
import {Location} from "@angular/common";
import {extract_merchant_from_param, Merchant} from "../payment/payment.component";
import {ActivatedRoute} from "@angular/router";
import {getParams, CryptoKey, newCryptoKey, showMessage, showError, $$} from "../../tools";
import {environment} from "../../environments/environment";
import {wait_message} from "../hourglass/hourglass.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  addr: string="";
  merchant:Merchant | undefined
  amount:number=5;
  show_can_close: boolean=false;
  balance: number=0;
  message="";

  public constructor(
    public network:NetworkService,
    public _location:Location,
    public toast:MatSnackBar,
    public routes:ActivatedRoute,
  ){}

  refund() {
    if(this.merchant && this.addr.length>0){
      let bank:CryptoKey=newCryptoKey("","",this.merchant!.wallet!.bank);
      wait_message(this,"Ajout de "+this.amount+" "+this.merchant!.wallet!.unity+" à votre compte ...");

      this.network.refund(bank,this.addr,this.merchant?.wallet?.token,this.amount,"Rechargement",this.merchant!.wallet!.network).subscribe((result)=>{
        $$("Fin du rechargement ",result);
        wait_message(this)
        if(result.error==""){
          showMessage(this,"Vous avez récupérer de nouveaux "+this.merchant?.wallet?.unity);
          this.show_can_close=true;
          this.refresh_balance();
        } else {
          showMessage(this,result.error);
        }

      },(err:any)=>{showError(this,err)})
    }
  }

  async ngOnInit() {
    let params:any=await getParams(this.routes);
    this.merchant=extract_merchant_from_param(params) || environment.merchant
    this.amount=Number(params.amount || 5)
    this.network.init_network(this.merchant!.wallet!.network);
    this.addr=params.addr || params.address || localStorage.getItem("faucet_addr") || "";
    this.refresh_balance();
  }

  save_local(){
    localStorage.setItem("faucet_addr",this.addr);
  }

  refresh_balance(){
    if(this.addr && this.addr.length>0){
      this.network.getBalance(this.addr,this.network.network,this.merchant?.wallet?.token).subscribe((result:any)=>{
        this.balance=Math.round(result[0].balance/1e16)/100;
      })
    }
  }

  update_address($event: { strong: boolean; address: string; provider: any }) {
    this.addr=$event.address;
    this.refresh_balance();
    this.save_local();
  }

  change_addr() {
    this._location.replaceState("bank","")
    this.addr="";
    this.balance=0;
    this.save_local();
  }
}
