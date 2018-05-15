import {Component, Injectable, Inject} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpResponse } from '@angular/common/http'
import { MatInputModule } from '@angular/material';
import {ContactsService} from './contacts.service';
import { AppComponent } from './app.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent {

  dialogExists: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  

  constructor(public dialog: MatDialog) { this.dialogExists = false;}

  openDialog(): void {

    if (this.dialogExists) { return; }
    let dialogRef = this.dialog.open(CreateContactDialogComponent, {

      width: '600px',
      data: { firstName: this.firstName, lastName: this.lastName }
    });
    this.dialogExists = true;
    dialogRef.afterClosed().subscribe(result => {
      this.dialogExists = false;
      this.lastName = result;
    });
  }
}

  @Component({
    selector: 'create-contact-dialog',
    templateUrl: './dialog.component.CreateContactDialog.html',
  })
  
  export class CreateContactDialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<CreateContactDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private contactsService: ContactsService) { }
  
    //cancel contact creation, do not save
    cancel(): void {
      this.dialogRef.close();
    }
    saveContact(): void{
      var res: any;
      this.contactsService.saveContact().subscribe();
      //this.appComponent.updateContacts();
      this.dialogRef.close();
    }
  
  }
