import {Component, Inject} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatInputModule } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent {


  firstName: string;
  lastName: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {

    let dialogRef = this.dialog.open(CreateContactDialogComponent, {

      width: '400px',
      data: { firstName: this.firstName, lastName: this.lastName }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
