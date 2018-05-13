import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContactsService } from './contacts.service';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent, DialogComponent]
})
export class AppModule { }
