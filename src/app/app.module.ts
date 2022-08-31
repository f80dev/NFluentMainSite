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




const routes: Routes = [
  { path: 'store', component: StoreComponent },
  { path: '', component: MainComponent ,pathMatch: 'full'}
]


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
    StoreComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatExpansionModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        RouterModule.forRoot(routes)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
