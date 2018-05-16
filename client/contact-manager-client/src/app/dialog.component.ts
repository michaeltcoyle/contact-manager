
import {Component, Injectable, Inject} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpResponse } from '@angular/common/http'
import { MatInputModule } from '@angular/material';
import {ContactsService} from './contacts.service';
import {CreateContact} from './createcontact.dialog.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent {

  dialogExists: boolean;
  

  constructor(public dialog: MatDialog) { this.dialogExists = false;}

  openDialog(): void {

    if (this.dialogExists) { return; }

    //Create Contact

    let dialogRef = this.dialog.open(CreateContact, {
      width: '600px'
    });
    this.dialogExists = true;
    dialogRef.afterClosed().subscribe(result => {
      this.dialogExists = false;
    });

    
  }
}
/*
  @Component({
    selector: 'create-contact-dialog',
    templateUrl: './dialog.component.CreateContactDialog.html',
  })
  
  export class CreateContactDialogComponent2 {

    firstName: string;
    lastName: string;
    phone: string;
    email: string;

    constructor(
      public dialogRef: MatDialogRef<CreateContactDialogComponent>, private contactsService: ContactsService) { }
  
    //cancel contact creation, do not save
    cancel(): void {
      this.dialogRef.close();
    }
    saveContact(): void{
      this.contactsService.saveContact(this.firstName, this.lastName, this.phone, this.email);
      this.dialogRef.close();
    }
  
  }
  */