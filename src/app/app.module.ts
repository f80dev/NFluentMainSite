import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
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


@NgModule({
  declarations: [
    AppComponent,
    BlocComponent,
    StepsComponent,
    SectionComponent,
    TeamComponent,
    ParagrapheComponent,
    ReverseblocComponent
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
        MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
