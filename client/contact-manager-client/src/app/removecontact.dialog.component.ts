import {Component, Injectable, Inject} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpResponse } from '@angular/common/http'
import { MatInputModule } from '@angular/material';
import {ContactsService} from './contacts.service';
import {DialogComponent} from './dialog.component';
import {Contact} from './contact.model';
import {MatListModule} from '@angular/material/list';

  @Component({
    selector: 'remove-contact.dialog',
    templateUrl: './removecontact.dialog.component.html',
  })
  
  export class RemoveContact {

    contacts: Contact[];

    firstName: string;
    lastName: string;
    phone: string;
    email: string;

    constructor(
      public dialogRef: MatDialogRef<RemoveContact>, private contactsService: ContactsService) { 
        this.contactsService.currentContacts.subscribe(data => this.contacts = data);
      }
  
    //cancel contact creation, do not save
    cancel(): void {
      this.dialogRef.close();
    }
    removeContact(): void{/*
      if (!this.firstName && !this.lastName){
        console.log("must enter a first or last name!");
        this.dialogRef.close();
        return;
      }
      this.contactsService.saveContact(this.firstName, this.lastName, this.phone, this.email);
      this.dialogRef.close();*/
    }
  
  }