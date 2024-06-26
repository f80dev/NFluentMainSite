import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BlocComponent } from './bloc/bloc.component';
import { StepsComponent } from './steps/steps.component';
import { SectionComponent } from './section/section.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { TeamComponent } from './team/team.component';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ParagrapheComponent } from './paragraphe/paragraphe.component';
import { ReverseblocComponent } from './reversebloc/reversebloc.component';
import {MatMenuModule} from "@angular/material/menu";
import { ConvictionComponent } from './conviction/conviction.component';
import { StoreComponent } from './store/store.component';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {AppComponent} from "./app.component";
import {ScrollToModule} from "@nicky-lenaers/ngx-scroll-to";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TheblogComponent } from './theblog/theblog.component';
import {HttpClientModule} from "@angular/common/http";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "@abacritt/angularx-social-login";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ScannerComponent } from './scanner/scanner.component';
import {WebcamModule} from "ngx-webcam";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../environments/environment";
import {NetworkService} from "./network.service";
import {InputComponent} from "./input/input.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {DeviceService} from "./device.service";
import {MatSliderModule} from "@angular/material/slider";
import { CreatorComponent } from './creator/creator.component';
import { SafePipe } from './safe.pipe';
import { TokendocComponent } from './tokendoc/tokendoc.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AdminComponent } from './admin/admin.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { PromptComponent } from './prompt/prompt.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {FileDragNDropDirective} from "./file-drag-ndrop.directive";
import {HourglassComponent} from "./hourglass/hourglass.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from "@angular/material/stepper";
import { TokendocVerifyComponent } from './tokendoc-verify/tokendoc-verify.component';
import {GALLERY_CONFIG, GalleryModule} from 'ng-gallery';
import {StyleManagerService} from "./style-manager.service";
import { FaqsComponent } from './faqs/faqs.component';
import {AuthentComponent} from "./authent/authent.component";
import { PaymentComponent } from './payment/payment.component';
import { AskForPaymentComponent } from './ask-for-payment/ask-for-payment.component';
import { SupportComponent } from './support/support.component';
import {MatCardModule} from "@angular/material/card";
import {GooglePayButtonModule} from "@google-pay/button-angular";
import { JaugeComponent } from './jauge/jauge.component';
import { AutovalidatorComponent } from './autovalidator/autovalidator.component';
import { ProofofhumanityComponent } from './proofofhumanity/proofofhumanity.component';
import {NgxCaptchaModule} from "ngx-captcha";
import { SplashComponent } from './splash/splash.component';
import { AppsComponent } from './apps/apps.component';
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {FilterPipe} from "./filter.pipe";
import {TutoComponent} from "./tuto/tuto.component";
import {CollectionSelectorComponent} from "./collection-selector/collection-selector.component";
import {ShowroomComponent} from "./showroom/showroom.component";

const routes: Routes = [
    { path: 'store', component: StoreComponent },
    { path: 'blog', component: TheblogComponent },
    { path: 'apps', component: AppsComponent },
    { path: 'leblog', component: TheblogComponent,pathMatch:"prefix" },
    { path: 'create', component: CreatorComponent },
    { path: 'tokendoc', component: TokendocComponent},
    { path: 'admin', component: AdminComponent,pathMatch: 'full' },
    { path: 'poh', component: ProofofhumanityComponent },
    { path: 'proofofhumanity', component: ProofofhumanityComponent },
    { path: 'theblog', component: TheblogComponent },
    { path: 'main', component: MainComponent },
    { path: '', component: MainComponent ,pathMatch: 'full' }
]

export const GOOGLE_CLIENT_ID="167299914377-p8vuf2f6npqnigl5kpqrh34cqjd81eko.apps.googleusercontent.com"
const config: SocketIoConfig = { url: environment.server, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BlocComponent,
    StepsComponent,
    SectionComponent,
    TeamComponent,
    ParagrapheComponent,
    ReverseblocComponent,
    ConvictionComponent,
    StoreComponent,
    TheblogComponent,
    CreatorComponent,
    SafePipe,
    TokendocComponent,
    AdminComponent,
    FileDragNDropDirective,
    TokendocVerifyComponent,
    SupportComponent,
    ProofofhumanityComponent,
    AppsComponent
  ],
    imports: [
        BrowserModule,
        MatSliderModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        GalleryModule,
        HttpClientModule,
        WebcamModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatExpansionModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        SocialLoginModule,
        MatInputModule,
        MatMenuModule,
        ScrollToModule.forRoot(),
        SocketIoModule.forRoot(config),
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        ClipboardModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatStepperModule,
        MatCardModule,
        GooglePayButtonModule,
        NgxCaptchaModule,
        MatListModule,
        MatTabsModule
    ],
  providers: [
      DeviceService,StyleManagerService,
      {provide: MAT_DIALOG_DATA, useValue: {hasBackdrop: false}},
      {provide: 'SocialAuthServiceConfig',
          useValue: {
              autoLogin: false,
              providers: [
                  {
                      id: GoogleLoginProvider.PROVIDER_ID,
                      provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID),
                  }
              ],
          } as SocialAuthServiceConfig},
      {
          provide: GALLERY_CONFIG,
          useValue: {
              dots: true,
              imageSize: 'cover'
          }
      }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public network:NetworkService) {
        setTimeout(()=>{
            config.url=this.network.server_nfluent;
        },10000);
    }
}
