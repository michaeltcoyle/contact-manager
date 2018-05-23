import {Component, Injectable, Inject} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpResponse } from '@angular/common/http'
import { MatInputModule } from '@angular/material';
import {ContactsService} from './contacts.service';
import {DialogComponent} from './dialog.component';
import {agRow} from './agRow.model'

  @Component({
    selector: 'edit-contact.dialog',
    templateUrl: './editcontact.dialog.component.html',
  })
  
  export class EditContact {

    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    selectedRow: agRow;
    id: string;

    constructor(
      public dialogRef: MatDialogRef<EditContact>, private contactsService: ContactsService) { 
        //get selected row data
        this.selectedRow = this.contactsService.getSelectionRow();
        if (this.selectedRow == null)
        {
          this.dialogRef.close();
        }
        else
        {
          this.firstName = this.selectedRow.firstName;
          this.lastName = this.selectedRow.lastName;
          this.phone = this.selectedRow.phone;
          this.email = this.selectedRow.email;
          this.id = this.selectedRow.id;
        }
      }
  
    //cancel contact edit, do not save
    cancel(): void {
      this.dialogRef.close();
    }
    editContact(): void{
      if (!this.firstName && !this.lastName){
        console.log("must enter a first or last name!");
        this.dialogRef.close();
        return;
      }
      console.log(this.firstName);
      this.contactsService.editContact(this.firstName, this.lastName, this.phone, this.email, this.id);
      this.dialogRef.close();
    }
  
  }