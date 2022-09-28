import {WalletProvider} from "@elrondnetwork/erdjs-web-wallet-provider";
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NetworkService} from "../network.service";
import {UserService} from "../user.service";
import {$$, isLocal, showMessage} from "../../tools";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WalletConnectProvider} from "@elrondnetwork/erdjs-wallet-connect-provider/out";
import {environment} from "../../environments/environment";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {WALLET_PROVIDER_DEVNET, WALLET_PROVIDER_MAINNET} from "@elrondnetwork/erdjs-web-wallet-provider/out/constants";
import {NFT} from "../../nft";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-authent',
  templateUrl: './authent.component.html',
  styleUrls: ['./authent.component.css']
})
export class AuthentComponent implements OnInit {

  @Input() intro_message:string="Email / Adresse de blockchaine";
  @Input() network:string="elrond-devnet";
  @Input() checknft:string=""; //Vérifie si l'utilisateur dispose d'un ou plusieurs NFT
  @Input() explain_message:string="Adresse de votre wallet ou votre email si vous n'en avez pas encore";
  @Output('authent') onauthent: EventEmitter<any>=new EventEmitter();
  @Output('cancel') oncancel: EventEmitter<any>=new EventEmitter();
  @Output('disconnect') onlogout: EventEmitter<any>=new EventEmitter();

  @Input() showAccesCode=false;
  @Input() showWebcam=false;
  @Input() showDynamicToken=false;
  @Input() showGoogle=false;
  @Input() showNetwork=true;
  @Input() strong=true;

  qrcode: string="";
  access_code="";
  address: string="";
  dynamic_token: string = "";

  constructor(
    public api:NetworkService,
    public user:UserService,
    public _location:Location,
    public clipboard:Clipboard,
    public routes:ActivatedRoute,
    private socialAuthService: SocialAuthService,
    public toast:MatSnackBar
  ) {
    this.user.provider=new WalletConnectProvider(
      "https://bridge.walletconnect.org",
      {
        onClientLogin: ()=> {
          if(this.user.provider){
            this.user.provider.getAddress().then((addr:string)=>{
              this.address=addr;
              this.strong=true;
              if(this.user.provider)
                this.user.provider.getSignature().then((sign:string)=>{
                  $$("signature="+sign);
                })
              this.validate();
            })
          }
        },
        onClientLogout: ()=> {
          $$("Déconnection");
          this.user.strong=false;
          this.onlogout.emit();
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.user.provider){
      this.user.provider.init().then((b: boolean) => {
        if(this.user.provider){
          this.user.provider.login().then((s: string) => {
            this.qrcode = environment.server + "/api/qrcode/" + encodeURIComponent(s);
          });
        }
      });
    }

    if(isLocal(environment.appli)){
      this.user.email="hhoareau@gmail.com";
      if(this.routes.snapshot.queryParamMap.get("goback")=='true')this._location.back();
    }
  }


  open_wallet() {
    if(this.network.indexOf("elrond")>-1) {
      let callback_url=environment.appli + this._location.path().split("?")[0];
      let url_wallet=this.network.indexOf("devnet")==-1 ? WALLET_PROVIDER_MAINNET : WALLET_PROVIDER_DEVNET;
      new WalletProvider(url_wallet).login({
        callbackUrl:callback_url
      }).then((result) => {
        this.address = result;
        this.strong = true;
        this.onauthent.emit();
      })
    }
  }

  check_condition(nfts:NFT[]){
    $$("Vérification des conditions d'accès "+this.checknft)
    for(let elts of this.checknft.split(" | ")) {
      for (let elt of elts.split(" & ")) {
        let is_in = false;
        for (let nft of nfts) {
          if (nft.collection.name) elt = elt.replace(nft.collection.name, "")
        }
        if (elt.length == 0) return true;
      }
    }
    return false;
  }


  validate() {
    if(this.user && this.address && this.address.indexOf("@")==-1 && !this.api.isElrond(this.address)){
      showMessage(this,"Pour l'instant, Le service n'est compatible qu'avec les adresses elrond");
    } else {
      if(this.checknft.length>0){
        this.api.get_tokens_from("owner",this.address,1000,true,null,0,this.network).then((r:NFT[])=>{
          if(this.check_condition(r)){
            this.onauthent.emit({addr:this.address,nftcheck:true})
          } else {
            this.onauthent.emit({addr:this.address,nftcheck:false})
          }
        })
      } else {
        this.onauthent.emit({addr:this.address,nftcheck:true});
      }

    }
  }

  update_address() {
    //this.address=this.address.replace("@gmail","@gmail.com");
  }

  connect(network: string) {
    if(network=="elrond"){
      // @ts-ignore
      open(this.network.url_wallet(),"walletElrond")

    }

    if(network=="solana"){
      // @ts-ignore
      if(window.solflare || window.phantom){
        // this.solWalletS.connect().then( (wallet:Wallet) => {
        //   this.user.init(wallet).then((profil:any)=>{
        //     this.back();
        //     // if(requis.length>0){
        //     //   if(profil.perms.indexOf("*")==-1 && profil.perms.indexOf(requis)==-1)
        //     //     this.router.navigate(["faqs"],{queryParams:{"open":"not_authorized"}});
        //     // }
        //     //
        //   });
        // }).catch((err:any) => {
        //   console.log("Error connecting wallet", err );
        //   this.router.navigate(["faqs"],{queryParams:{"open":"not_authorized"}});
        // })
      }
    }

    if(network=="google"){
      let servicePlatform = GoogleLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(servicePlatform).then((socialUser) => {
        this.user.email=socialUser.email;
        this.user.name=socialUser.firstName + " "+ socialUser.lastName;
        this.user.strong=true;
      })
    }

    if(network=="code"){
      if(this.access_code=="4271"){
        this.user.email="paul.dudule@gmail.com";
        this.user.name="paul";
        this.strong_connect();
        this.back();
      }
    }
  }

  back(){
    this._location.back();
  }

  on_flash($event: {data:string}) {
    if($event.data.length>20){
      this.api.check_access_code($event.data).subscribe((result:any)=>{
        this.address=result.addr;
        this.validate();
      },(err:any)=>{
        showMessage(this,"Code incorrect")
      })
    }
  }

  private strong_connect() {
    showMessage(this,"Authentification validée.")
  }

  update_dynamic_token() {
    navigator.clipboard.readText().then(
      text => {
        this.on_flash({data:text});
      }
    )
      .catch(error => {
          showMessage(this,'Impossible de lire le presse-papier');
        }
      );

  }

}
