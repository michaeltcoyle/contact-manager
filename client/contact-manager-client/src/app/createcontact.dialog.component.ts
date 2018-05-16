import {Component, Injectable, Inject} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpResponse } from '@angular/common/http'
import { MatInputModule } from '@angular/material';
import {ContactsService} from './contacts.service';
import {DialogComponent} from './dialog.component';

  @Component({
    selector: 'create-contact.dialog',
    templateUrl: './createcontact.dialog.component.html',
  })
  
  export class CreateContact {

    firstName: string;
    lastName: string;
    phone: string;
    email: string;

    constructor(
      public dialogRef: MatDialogRef<CreateContact>, private contactsService: ContactsService) { }
  
    //cancel contact creation, do not save
    cancel(): void {
      this.dialogRef.close();
    }
    saveContact(): void{
      this.contactsService.saveContact(this.firstName, this.lastName, this.phone, this.email);
      this.dialogRef.close();
    }
  
  }