import {Component, Injectable, Inject} from '@angular/core'
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

    name: string;
    phone: string;
    email: string;

    selectionRow: agRow;

    contacts: Contact[];

    constructor(
      public dialogRef: MatDialogRef<RemoveContact>, private contactsService: ContactsService) { 
        this.selectionRow = this.contactsService.getSelectionRow();
        if (this.selectionRow == null){
          this.dialogRef.close()
        }
        else{
          this.name = this.selectionRow.name;
          this.phone = this.selectionRow.phone;
          this.email = this.selectionRow.email;
        }
      }
  
    //cancel contact remove, do not save
    cancel(): void {
      this.dialogRef.close();
    }
    removeContact(): void {
      this.contactsService.deleteContact();
      this.dialogRef.close();
    }
  }