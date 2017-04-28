import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdToolbarModule,MdInputModule, MdChipsModule, 
  MdTabsModule, MdSelectModule, MaterialModule, MdDialogModule,
MdCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TopheaderComponent } from './topheader/topheader.component';
import { SearchtoolComponent } from './searchtool/searchtool.component';
import { MainbodyComponent } from './mainbody/mainbody.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { DeleteComponent } from './delete/delete.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    TopheaderComponent,
    SearchtoolComponent,
    DeleteComponent,
    MainbodyComponent,
    NavigatorComponent,
    ContactlistComponent
    
  ],
  entryComponents: [DeleteComponent],
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
    MdDialogModule,
    MdCardModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
