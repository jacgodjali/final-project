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
import { NavigatorComponent } from './navigator/navigator.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { DeleteComponent } from './delete/delete.component';
import { FilterComponent } from './filter/filter.component';
import { AppService } from './app.service';
import { RefreshService } from './refresh.service';
import { lookupListToken, lookupLists } from './provides';
import { Routing } from './app.routing';
import { DatePipe} from '@angular/common';
import { SafeUrl } from 'app/safeUrl.pipe';
import 'hammerjs';



@NgModule({
  declarations: [
    AppComponent,
    TopheaderComponent,
    SearchtoolComponent,
    DeleteComponent,
    NavigatorComponent,
    ContactlistComponent,
    FilterComponent,
    SafeUrl
  ],
  entryComponents: [DeleteComponent, FilterComponent ],
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
    MdCardModule,
    Routing
  ],
  providers: [AppService, RefreshService, DatePipe,
  {
      provide: lookupListToken, useValue: lookupLists
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
