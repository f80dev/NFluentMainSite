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
import {AuthentComponent} from "./authent/authent.component";
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

const routes: Routes = [
    { path: '', component: MainComponent ,pathMatch: 'full'},
  { path: 'store', component: StoreComponent },
  { path: 'blog', component: TheblogComponent },
    { path: 'leblog', component: TheblogComponent },
  { path: 'theblog', component: TheblogComponent },

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
        InputComponent,
        TeamComponent,
        ParagrapheComponent,
        ReverseblocComponent,
        ConvictionComponent,
        StoreComponent,
        TheblogComponent,
        AuthentComponent,
        ScannerComponent
    ],
    imports: [
        BrowserModule,
        MatSliderModule,
        MatSnackBarModule,
        HttpClientModule,
        WebcamModule,
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
        MatSelectModule
    ],
  providers: [
      DeviceService,
      {provide: 'SocialAuthServiceConfig',
          useValue: {
              autoLogin: false,
              providers: [
                  {
                      id: GoogleLoginProvider.PROVIDER_ID,
                      provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID),
                  }
              ],
          } as SocialAuthServiceConfig}
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
