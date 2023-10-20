import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NetworkService} from "../network.service";
import {
  showMessage,
  CryptoKey, newCryptoKey,
  getParams,
  $$, now, showError, isEmail, apply_params
} from "../../tools";
import {NFT} from "../../nft";
import {ActivatedRoute} from "@angular/router";
import {Collection, Connexion, newCollection} from "../../operation";
import {_prompt} from "../prompt/prompt.component";
import {environment} from "../../environments/environment";
import {wait_message} from "../hourglass/hourglass.component";
import {MatDialog} from "@angular/material/dialog";
import {GalleryState} from "ng-gallery";
import {StyleManagerService} from "../style-manager.service";
import {UserService} from "../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {_ask_for_paiement} from "../ask-for-payment/ask-for-payment.component";
import {extract_merchant_from_param, Merchant} from "../payment/payment.component";
import {DeviceService} from "../device.service";
import {get_nfluent_wallet_url, init_visuels} from "../../nfluent";

export interface Document {
  url: string;
  signature: string;
  file:string
  type:string
  filename:string
}

@Component({
  selector: 'app-tokendoc',
  templateUrl: './tokendoc.component.html',
  styleUrls: ['./tokendoc.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TokendocComponent implements OnInit {
  identity_types: string[]=["Numéro de Passeport","Numéro de sécurité sociale","Email"];
  identity_type: any = this.identity_types[2];
  identity: string = "";
  address:string=""       //Peut être une adresse de blockchain ou un email
  documents: Document[]=[];
  sel_visuel: any;
  collection:Collection | undefined
  miner:CryptoKey | undefined=undefined
  sel_visual:string="";
  visual:string="";
  joinDoc:boolean=true;
  message: string = "";
  show_scanner: boolean=false;
  url_wallet: string="";
  url_explorer:string="";
  url_gallery:string="";
  config:string=environment.appli + "/assets/"+environment.tokendoc.start_config
  infos: string="";
  advanced_mode: boolean=false;
  max_supply: number=1;
  stockage: string="github-nfluentdev-storage-main";
  stockage_document:string="github-nfluentdev-storage-main";
  appname: string=environment.tokendoc.appname;
  claim:string=environment.tokendoc.claim;
  visuels: any[]=[];
  message_preview="";
  show_login: boolean=false;
  name: string="Certificat de propriété";
  visuel_size="200px";
  nft_size: number=400;
  network:string=""
  price: number = environment.tokendoc.cost_in_crypto;
  fiat_price:number=  environment.tokendoc.cost_in_fiat;
  money:{name:string,supply:number,id:string} | undefined;
  merchant: Merchant | undefined;
  api_key_document: string = "";
  background: string = "";
  dest: string="";
  border="10px";
  size: string="450px";
  authentification: Connexion={
    private_key: false,
    address: false,
    direct_connect: false,
    email: false,
    extension_wallet: true,
    google: false,
    keystore: true,
    nfluent_wallet_connect: true,
    on_device: false,
    wallet_connect: true,
    web_wallet: true,
    webcam: false
  }
  slide: number=1
  title_button="Fabriquer"


  constructor(public api:NetworkService,
              public dialog:MatDialog,
              public user:UserService,
              public device:DeviceService,
              public toast:MatSnackBar,
              public style:StyleManagerService,
              public routes:ActivatedRoute) {

  }


  async read_param(){
    let params:any=await getParams(this.routes);
    $$("Lecture des parametres ",params)

    apply_params(this,params,environment.tokendoc);

    this.identity=params.identity || "";
    if(params.price)this.price=Number(params.price)

    if(params.fiat_price)this.fiat_price=Number(params.fiat_price)

    this.dest=params.address || params.dest || localStorage.getItem("last_dest") || this.user.addr || this.user.profil.email;
    this.stockage=params.stockage || environment.stockage.stockage;
    if(params.hasOwnProperty("miner")){
      this.miner=newCryptoKey("","","",params["miner"])
    } else {
      this.miner=environment.tokendoc.miner
    }

    this.stockage_document=params.stockage_document || environment.stockage.stockage_document;
    this.api_key_document=params.api_key_document || ""

    this.max_supply=Number(localStorage.getItem("max_supply") || "1");
    this.infos=localStorage.getItem("infos") || "";
    if(params.hasOwnProperty("merchant")){
      this.merchant=extract_merchant_from_param(params);
    }else{
      this.merchant=environment.merchant;
    }
    if(!this.merchant){
      $$("Si aucun marchant finance la création, on ne peut pas utiliser un email")
      this.authentification.email=false
      this.authentification.address=false
      this.authentification.google=false
    }else{
      this.title_button='pour '+this.price+' '+this.merchant!.wallet!.unity+' ou '+this.fiat_price+' '+this.merchant!.currency
    }

    this.api.get_token(params.money || "egld",this.network).subscribe((money)=>{this.money=money});

    if(this.miner){
      this.api.get_collections(params.collection || environment.tokendoc.collection,this.network).subscribe((cols:any)=>{
        if(cols.length==0){
          $$("La collection en parametre n'est pas disponible");
          this.collection=newCollection(params.collection || environment.tokendoc.collection,this.miner!);
        }else{
          this.collection=cols[0];
        }
      })
    }

    if(params.hasOwnProperty("doc")){
      this.attach_document(params["doc"])
    }else{
      if(localStorage.getItem("documents")){
        for(let document of JSON.parse(localStorage.getItem("documents") || "[]")){
          this.onFileSelected(document);
        }
        this.upload_document();
        this.eval_signatures();
      }
    }


    this.eval_preview(environment.tokendoc.cover,true);
  }




  ngOnInit() {
    this.device.isHandset$.subscribe((isHandset)=>{
      if(isHandset){this.border="0px";this.size="100%";}
    })
    this.read_param();
  }


  update_identity(new_value:any) {
    this.identity="";
    this.identity_type=new_value;
  }



  save_local(){
    localStorage.setItem("infos",this.infos);
    localStorage.setItem("max_supply",this.max_supply.toString());
    localStorage.setItem("title",this.name);

    for(let document of this.documents)
      if(document.file.length>10000)return;

    for(let visuel of this.visuels)
      if(visuel.length>10000)return;

    localStorage.setItem("documents",JSON.stringify(this.documents));
    if(this.visuels.length>0)localStorage.setItem("visual",this.sel_visual);
  }


  onFileSelected($event: Document) {
    let document=$event;
    document.url=""

    this.documents.push(document);
    this.upload_document();
    this.eval_signatures();

    // if($event.file.startsWith("data:image")){
    //     this.config=environment.appli + "/assets/config_certificat_photo.yaml"
    //     this.eval_preview($event.file,true);
    // }
    this.save_local();
  }



  async send(cb: string) {
    $$("minage sur le réseau "+this.network)
    if(this.merchant){
      if(this.price>0 || this.fiat_price>0){
        try{
          let rep:any=await _ask_for_paiement(this,
            this.merchant.wallet!.token,
            this.price,this.fiat_price,
            this.merchant,
            this.user.wallet_provider,
            "Frais de minage du certificat",
            "Choisissez un mode de paiement",
            "",
            "",
            {contact: this.merchant.contact, description: "Signature électronique de document", subject: ""})

          if(rep){
            this.user.wallet_provider=rep.data.provider;
            this.user.buy_method=rep.buy_method;
            if(rep.billing_to)showMessage(this,"Retrouvé votre facture sur "+rep.billing_to)
            this.run_mining(rep.address);
          } else {
            showMessage(this,"Paiement annulé")
            return
          }
        } catch(e){
          showMessage(this,"Paiement annulé")
          return;
        }
      }
    } else {
      this.run_mining(this.address)
    }
  }


  async run_mining(addr:string){
    let address=this.dest;
    if(address){
      localStorage.setItem("last_dest",address);
      wait_message(this,"Mise en ligne du visuel du certificat");
      let src_image=this.sel_visuel.data.src;
      this.api.upload(src_image,this.stockage).subscribe(async (image:any)=>{
        if(!image){
          showError(this,"Problème de mise en ligne de l'image");
          return;
        }
        wait_message(this,"Création du compte sur "+this.network);
        this.api.create_account(
          this.network,
          address,
          environment.appli+"/assets/wallet_access.html",
          environment.appli+"/assets/existing_account_wallet_access.html"
        ).subscribe(async (account:any)=>{
          wait_message(this,"Fabrication du NFT"+account.explorer);
          let owner=account.address

          let files=this.documents.map((x:any)=>{return x["url"]});
          let attributes=[]
          if(this.identity){
            attributes.push({trait_type:this.identity_type,value:this.identity})
          } else {
            attributes.push({trait_type:"Propriétaire",value:owner})
          }
          for(let doc of this.documents){
            let name_doc=(doc.filename.length>0) ? doc.filename : doc.url;
            attributes.push({trait_type:"Référence document",value:name_doc})
            attributes.push({trait_type:"Empreinte",value:doc.signature})
          }

          let nft:NFT={
            type: "SemiFungible",
            address: undefined,
            attributes: attributes,
            collection: this.collection,
            creators: [{address:this.address,share:100,verified:true}],
            description: this.infos,
            files: files,
            links: undefined,
            supply:this.max_supply,
            price: 0,
            message: undefined,
            miner:this.miner || this.user.addr,
            name: this.name,
            network: this.network,
            owner: owner,
            royalties: 0,
            solana: undefined,
            style: undefined,
            symbol: "NFluenTCertif",
            tags: "Certificat",
            visual: image.url,
            balances: {},
          }
          //nft["balances"][miner_addr]=this.max_supply
          $$("Minage du NFT attribué a "+account.address)
          try{
            let t_minage:any=await this.api.mint(nft,owner,"",false,this.stockage,this.network)
            t_minage=await this.api.execute(t_minage,this.network,this.miner || this.user.wallet_provider)
            wait_message(this)
            if(t_minage.error==""){
              localStorage.removeItem("document");
              if(isEmail(address))showMessage(this,"Consulter votre mail "+address+" pour retrouver votre NFT")
              this.url_wallet=get_nfluent_wallet_url(owner,this.network,environment.wallet);
              this.url_explorer=t_minage.link_mint;
              this.url_gallery=t_minage.link_gallery;
            } else {
              showMessage(this,"Probleme technique "+t_minage.error)
            }
          } catch (e) {
            wait_message(this)
            showError(this,e);
          }

        })
      })
    }
  }


  raz_document(document:any) {
    this.documents.splice(this.documents.indexOf(document),1);
    this.sel_visual="";
    this.save_local();
  }


  async upload_document() {
    return new Promise(resolve => {
      let i=0;
      if(this.joinDoc){
        for(let document of this.documents){
          if(document.file.startsWith("http")){
            document.url=document.file;
            i=i+1;
            if(i==this.documents.length)resolve(true);
          }
          if(!document.url || document.url.length==0){
            this.api.upload(document,this.stockage_document,document.type,"",this.api_key_document).subscribe((r:any)=>{
              if(r && r.url){
                document.url=r.url.replace(" ","%20");
                document.signature=r.hash
                i=i+1;
                if(i==this.documents.length)resolve(true);
              }
            },(err)=>{
              showError(this,"Probléme technique. Document non attaché");
              this.joinDoc=false;
            })
          }
        }
      } else {
        for(let document of this.documents)
          document["url"]="";
      }
    });

  }


  restart(force=false) {
    _prompt(this,"Effacer et recommencer ?","","","oui/non","Recommencer","Continuer",true,null,force).then((rep)=>{
      if(rep=="yes"){
        this.url_wallet='';
        this.url_explorer='';
        this.documents=[];
        this.sel_visuel=undefined;
        this.config=environment.appli + "/assets/"+environment.tokendoc.start_config
        this.visuels=[];
        this.eval_preview();
      }
    })
  }


  open_doc(document: any) {
    open(document.url,"view_document")
  }

  eval_signatures(){
    let l=[]
    for(let d of this.documents){
      if(d.signature=="")l.push(d.file);
    }
    if(l.length>0){
      this.api.hashcode(l).subscribe((result:string[])=> {
        for (let i=0;i<this.documents.length;i++) {
          this.documents[i].signature = result[i];
        }
      })
    }
  }

  isSemiFungible() {
    if(!this.collection?.type)return false;
    return this.collection?.type.startsWith('SemiFungible')
  }

  capture($event: any) {
    this.show_scanner=false;
    let filename="capt_"+now("hex")+".jpg"
    this.onFileSelected({
      url:"",
      file:$event.data,
      signature: "",
      filename:filename,
      type:"image/jpeg"
    });
  }

  eval_preview(visual:string="",force=false) : boolean {
    if(visual.length>0)this.sel_visual=visual;
    if(!force && this.name==localStorage.getItem("title"))return true;

    $$("Mise a jour des visuels avec "+visual)
    this.save_local();

    this.message_preview="Preview en cours de construction";
    this.api.send_photo_for_nftlive(
      15,this.config, this.nft_size.toString(), 80,"",
      [{name: "title",value: this.name}, {name: "dtMining",value:now("date")}],
      {photo: this.sel_visual}, "base64").subscribe(async (visuels: any) => {
      this.message_preview="";
      this.visuels=init_visuels(visuels.images)
      if(!this.sel_visuel && this.visuels.length>0)this.sel_visuel=this.visuels[0];
    },()=>{
      this.message_preview="";
    })
    return true;
  }

  select_visual($event: any) {
    this.config=environment.appli + "/assets/config_certificat_photo.yaml"
    this.eval_preview($event.file,true);
  }

  login(event:any) {
    this.user.init_wallet_provider(event.provider,event.address)
    if(this.dest=="")this.dest=event.address;
    this.show_login=false;
  }

  disconnect() {
    this.show_login=false;
  }

  fail(addr:string) {
    this.show_login=false;
  }

  cancel() {
    this.show_login=false;
  }

  open_image(image: string) {
    open(image,"preview");
  }

  async attach_document(url="") {
    if(url.length==0){
      url=await _prompt(this,"Indiquer l'url du document a attacher","https://","","text","Attacher","Annuler",false);
    }
    if(!url.startsWith("http")){
      showMessage(this,"Ceci n'est pas une adresse internet")
      return;
    }

    this.documents.push({
      url:url,
      signature:"",
      file:url,
      filename:url,
      type:""
    });
    this.save_local();
    this.eval_signatures();
  }

  update_preview() {
    this.eval_preview();
  }

  select_visuel($event: GalleryState) {
    this.sel_visuel=this.visuels[$event.currIndex!]
  }

  default_visual() {
    this.eval_preview(environment.tokendoc.visual,true);
  }

  sel_collection($event: Collection) {
    this.collection=$event
  }
}
