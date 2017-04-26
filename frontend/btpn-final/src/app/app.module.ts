import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdToolbarModule,MdInputModule, MdChipsModule, 
  MdTabsModule, MdSelectModule, MaterialModule, MdDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TopheaderComponent } from './topheader/topheader.component';
import { SearchtoolComponent } from './searchtool/searchtool.component';
import { SidelistComponent } from './sidelist/sidelist.component';
import { MainbodyComponent } from './mainbody/mainbody.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    TopheaderComponent,
    SearchtoolComponent,
    SidelistComponent,
    MainbodyComponent,
    NavigatorComponent,
    ContactlistComponent,
    ContactComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdInputModule,
    MdChipsModule,
    MdTabsModule,
    MdSelectModule,
    MaterialModule,
    MdDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
