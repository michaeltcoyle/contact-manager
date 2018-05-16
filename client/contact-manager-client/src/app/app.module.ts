import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContactsService } from './contacts.service';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogComponent} from './dialog.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {CreateContact} from './createcontact.dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    CreateContact
  ],
  entryComponents: [
    CreateContact
  ],
  imports: [
    AgGridModule.withComponents([]),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [ContactsService, 
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {float: 'always'}}
  ],
  bootstrap: [AppComponent, DialogComponent]
})
export class AppModule { }
