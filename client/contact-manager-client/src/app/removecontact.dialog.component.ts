import {Component, Injectable, Inject, Input} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpResponse } from '@angular/common/http'
import { MatInputModule } from '@angular/material';
import {ContactsService} from './contacts.service';
import {DialogComponent} from './dialog.component';
import {Contact} from './contact.model';
import {MatListModule} from '@angular/material/list';
import {agRow} from './agRow.model';

  @Component({
    selector: 'remove-contact.dialog',
    templateUrl: './removecontact.dialog.component.html',
  })
  
  export class RemoveContact {

    @Input ('name') name: string;
    @Input ('phone') phone: string;
    @Input ('email') email: string;

    selectionRow: agRow;

    contacts: Contact[];

    constructor(
      public dialogRef: MatDialogRef<RemoveContact>, private contactsService: ContactsService) { 
        this.contactsService.currentContacts.subscribe(data => this.contacts = data);
        this.selectionRow = this.contactsService.getSelectionRow();
        this.name = this.selectionRow.name;
        this.phone = this.selectionRow.phone;
        this.email = this.selectionRow.email;
      }
  
    //cancel contact creation, do not save
    cancel(): void {
      this.dialogRef.close();
    }
    removeContact(): void {
      this.contactsService.deleteContact();
      this.dialogRef.close();
    }
  
  }