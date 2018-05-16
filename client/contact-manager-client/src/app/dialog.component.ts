
import {Component, Injectable, Inject} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpResponse } from '@angular/common/http'
import { MatInputModule } from '@angular/material';
import {ContactsService} from './contacts.service';
import {CreateContact} from './createcontact.dialog.component';
import {RemoveContact} from './removecontact.dialog.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent {
  

  constructor(public dialog: MatDialog) {}

  createContact(): void {
    this.dialog.closeAll(); 
    let dialogRef = this.dialog.open(CreateContact, {
      width: '600px'
    });
  }
  removeContact(): void {
    this.dialog.closeAll(); 
    let dialogRef = this.dialog.open(RemoveContact, {
      width: '600px'
    });
  }


}