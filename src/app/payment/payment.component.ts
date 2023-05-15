import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  Transaction,
  TokenTransfer,
  TransactionPayload,
  Address,
  TransferTransactionsFactory, GasEstimator
} from "@multiversx/sdk-core/out";
import {WalletConnectV2Provider} from "@multiversx/sdk-wallet-connect-provider/out";
import {NetworkService} from "../network.service";
import {$$, CryptoKey, now, showMessage} from "../../tools";
import { Account } from "@multiversx/sdk-core";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import {_prompt} from "../prompt/prompt.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ReadyToPayChangeResponse} from "@google-pay/button-angular";

export interface PaymentTransaction {
  transaction:string ,
  price:number,
  ts:string,
  address:string,
  billing_to:string,
  unity:string,
  provider:any
}

//Interface incluant le paiement en fiat et le paiement crypto
export interface Merchant {
  id:string
  name:string
  currency:string
  country:string
  contact: string
  wallet:{
    network:string,
    address:string,
    token:string,
    unity:string,
    bank: string
  } | undefined
}

export function extract_merchant_from_param(params:any) : Merchant | undefined {
  if(params["merchant.name"]){
    return {
      contact: params["merchant.contact"],
      country: params["merchant.country"],
      currency: params["merchant.currency"],
      id: params["merchant.id"],
      name: params["merchant.name"],
      wallet: {
        network:params["merchant.wallet.network"],
        address:params["merchant.wallet.address"],
        token:params["merchant.wallet.token"],
        unity:params["merchant.wallet.unity"],
        bank:params["merchant.wallet.bank"],
      }
    }
  } else return undefined;

}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterContentInit {
  payment_request: any;
  money: { name: string, supply: number, id: string, unity: string } | undefined;
  @Input() price: number = 0
  @Input() fiat_price: number=0;
  @Input() billing_to: string="";
  @Input() merchant: Merchant | undefined
  @Output('paid') onpaid: EventEmitter<PaymentTransaction>=new EventEmitter();
  @Output('cancel') oncancel: EventEmitter<any> =new EventEmitter();
  @Input() user: string = ""
  @Input() buy_method: "fiat" | "crypto" | "" = "";
  @Input() wallet_provider: WalletConnectV2Provider | any

  qrcode: string="";
  balance: number=-1;
  qrcode_buy_token: string = "";

  constructor(
      public networkService: NetworkService,
      public toast:MatSnackBar,
      public dialog:MatDialog
  ) {
  }

  ngAfterContentInit(): void {
    this.refresh();
  }

  refresh(){
    let network=this.merchant?.wallet!.network!
    let token=this.merchant?.wallet?.token || "egld"
      this.networkService.get_token(token,network).subscribe(async (money)=>{
        this.money=money
        if(this.wallet_provider && this.wallet_provider.account){
          this.user=this.wallet_provider.account.address;
          this.show_user_balance(this.user,token,network)
        }
      });

    if(this.merchant) {
      this.payment_request = {
        apiVersion: 2, apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'], allowedCardNetworks: ['VISA', 'MASTERCARD']},
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {gateway: 'example', gatewayMerchantId: 'exampleGatewayMerchantId'}
          }
        }],
        merchantInfo: {merchantId: this.merchant.id, merchantName: this.merchant.name},
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: this.fiat_price.toString(),
          currencyCode: this.merchant.currency,
          countryCode: this.merchant.country
        }
      }
    }
  }

  async show_user_balance(addr:string,token_id:string,network:string){
    try{
      this.balance=await this.get_balance(addr,token_id,network);
      if(this.price>this.balance/1e18){
        this.networkService.qrcode(addr,"json").subscribe((r:any)=>{
          this.qrcode_buy_token=r.qrcode;
        })
      }
    }catch (e){
      showMessage(this,"Impossible de récupérer votre encours");
    }
  }

  ngOnChanges(changes: any): void {
    if(changes.user.currentValue){
      this.show_user_balance(changes.user.currentValue,this.money!.id,this.merchant?.wallet?.network!)
    }
  }

  onReadyToPayChange = (event: CustomEvent<ReadyToPayChangeResponse>): void => {
    console.log('ready to pay change', event.detail);
  };

  onClickPreventDefault = (event: Event): void => {
    console.log('prevent default');
  };


  onLoadPaymentData = (event: google.payments.api.PaymentData): void => {
    let rc:PaymentTransaction={
      transaction:event.paymentMethodData.description || "",
      unity:this.money!.unity,
      address:event.paymentMethodData.description || "",
      price:0,
      ts:now("str"),
      billing_to:this.billing_to,
      provider:null
    }
    this.onpaid.emit(rc);
  };

  // onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = paymentData => {
  //   console.log('payment authorized', paymentData);
  //   return {
  //     transactionState: 'SUCCESS',
  //   };
  // };


  error_fiat_event(event: ErrorEvent): void {
    console.error('error', event.error);
  }

  async start_payment(amount:number){
    try{
      let result=await this.payment(amount);
      this.onpaid.emit(result);
    } catch(e) {
      showMessage(this,"Paiement annulé");
    }
  }

  async payment(amount=0.001) : Promise<PaymentTransaction>{
    //
    return new Promise( async(resolve,reject) => {
      let unity="EUR"
      if(this.wallet_provider){
        unity=this.money!.unity
        let sender_addr=this.wallet_provider.address || this.wallet_provider.account.address;
        $$("Paiement avec l'adresse "+sender_addr)
        //voir https://docs.multiversx.com/sdk-and-tools/sdk-js/sdk-js-cookbook/
        let payment={
          address:this.merchant?.wallet!.address,
          amount:amount,
          description:'paiement pour signature'
        }
        const proxyNetworkProvider = new ProxyNetworkProvider("https://devnet-gateway.multiversx.com");
        let t:Transaction;
        if(unity=="egld"){
          let opt={
            data:new TransactionPayload("Paiement"),
            value:TokenTransfer.egldFromAmount(payment.amount),
            gasLimit: 7000,
            sender: Address.fromBech32(sender_addr),
            receiver: Address.fromBech32(this.merchant?.wallet!.address!),
            chainID: this.networkService.chain_id
          }
          t=new Transaction(opt);
        }else{
          const factory = new TransferTransactionsFactory(new GasEstimator());
          //voir https://docs.multiversx.com/sdk-and-tools/sdk-js/sdk-js-cookbook#token-transfers
          t=factory.createESDTTransfer({
            tokenTransfer: TokenTransfer.fungibleFromAmount(this.money!.id,this.price,18),
            sender: Address.fromBech32(sender_addr),
            receiver: Address.fromBech32(this.merchant?.wallet!.address!),
            chainID: this.networkService.chain_id
          })
          let sender_account=new Account(Address.fromBech32(sender_addr));
          let sender_on_network=await proxyNetworkProvider.getAccount(sender_account.address)
          sender_account.update(sender_on_network)
          t.setNonce(sender_account.getNonceThenIncrement());
        }

        try {
          let sign_transaction=await this.wallet_provider.signTransaction(t);
          let hash=await proxyNetworkProvider.sendTransaction(sign_transaction);
          resolve({
            transaction:hash,
            price:this.price,
            ts:now("str"),
            address:sender_addr,
            billing_to:this.billing_to,
            unity:unity,
            provider:this.wallet_provider});
        } catch(error) {
          $$("Error",error)
          reject(error)
        }
      }
      reject("no provider");
    });

  }


  async get_balance(addr:string,token_id:string,network:string) : Promise<number> {
    return new Promise((resolve,reject) => {
        if(addr.length>0 && network.length>0 && token_id.length>0){
          this.networkService.getBalance(addr,network,token_id).subscribe((r:any)=>{
            for(let owner of r){
              if(owner.address==addr)resolve(owner.balance);
            }
            resolve(0);
          },(err:any)=>{reject();})
        }
    });
  }


  async change_billing_address() {
    let email=await _prompt(this,"Adresse de réception de la facture",this.billing_to,"","text","Valider","Annuler",false);
    if(email)this.billing_to=email;
  }

  change_payment_mode() {
    this.buy_method="";
    this.wallet_provider=null;
    this.user="";
    this.oncancel.emit(null);
  }

  get_address(){
    return this.wallet_provider.address || this.wallet_provider.account.address;
  }

  refresh_solde() {
    this.show_user_balance(this.get_address(),this.money!.id,this.merchant?.wallet?.network!)
  }

    cancel_fiat_payment() {
      this.change_payment_mode();
    }


  open_bank() {
    let url="https://tokenforge.nfluent.io/bank?p=YW1vdW50PTUmYXBwbmFtZT1GYXVjZXQlMjBkZXZuZXQmY2xhaW09UmVjaGFyZ2VtZW50JmNvbW1lbnQ9YjY0JTNBYm5Wc2JBJTNEJTNEJmZpYXRfcHJpY2U9MCZtZXJjaGFudC5jb250YWN0PWNvbnRhY3QlNDBuZmx1ZW50LmlvJm1lcmNoYW50LmNvdW50cnk9RlImbWVyY2hhbnQuY3VycmVuY3k9RVVSJm1lcmNoYW50LmlkPUJDUjJETjRUWUQ0WjVYQ1ImbWVyY2hhbnQubmFtZT1OZmx1ZW50JTIwU3RvcmUmbWVyY2hhbnQud2FsbGV0LmJhbms9bmZsdWVudCUzQSUyMFowRkJRVUZCUW10WGNIUmFYemRwWkdWME15MVRVbFJwTTJkSmRtRmZia3hUZDI5SmIyODRWRlZzZEhscGJYbHVRek50Ymt0bFJWcEhSWFZrTkRSQ1pYRnNTVTA1YTJzNFZtUldjbkJ2YjNaU1IySjZkbmRWZW1WNllraDFVR2xuZW5KU04wRXdlbGxTWTBSM1VsUlVZVWx0ZFdFMldtdFJYeTFvZFhWaGVDMVpNVlE0VlVsUVptUnJTMnRRZGpCMk1YTkxVekJJWDJsVFRqWk1UREZFV1hKUU5WWkRVWFZXVHkxdVNrc3dhbkI0VjA5UE5IZHpQUSUzRCUzRCZtZXJjaGFudC53YWxsZXQubmV0d29yaz1lbHJvbmQtZGV2bmV0Jm1lcmNoYW50LndhbGxldC50b2tlbj1ORkxVQ09JTi00OTIxZWQmbWVyY2hhbnQud2FsbGV0LnVuaXR5PU5mbHVDb2luJnRvb2xiYXI9ZmFsc2UmdXJsPWh0dHBzJTNBJTJGJTJGdG9rZW5mb3JnZS5uZmx1ZW50LmlvJTJGYmFuayZ2aXN1YWw9aHR0cHMlM0ElMkYlMkZpbWFnZXMudW5zcGxhc2guY29tJTJGcGhvdG8tMTU2MjA2OTAyOC05MmYxMGUzN2FjOWQlM0ZpeGxpYiUzRHJiLTQuMC4zJTI2aXhpZCUzRE1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JTI2YXV0byUzRGZvcm1hdCUyNmZpdCUzRGNyb3AlMjZ3JTNENjg3JTI2cSUzRDgwJnRpdGxlPUZhdWNldCUyMGRldm5ldA%3D%3D";
    url=url+"&address="+this.get_address()
    open(url,"bank")
  }
}