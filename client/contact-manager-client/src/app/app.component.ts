import { Input, Component, OnInit, ElementRef, Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.model';
import { agRow } from './agRow.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Grid, ColumnApi, GridApi, GridOptions, GridReadyEvent} from "ag-grid";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  //Initialize Fields
  myGrid: Grid;
  selectedRow: agRow;
  rowData: agRow[];
  title = 'app';
  //Create Table Headers

  gridOptions: GridOptions;

  // let the grid know which columns and what data to use

  public contacts: Contact[];

  constructor(private contactsService: ContactsService) {
    //Get Contact Data
    this.createGrid()
    this.contactsService.currentContacts.subscribe(data => {
      this.rowData = this.populateRows(data);
    });
  }

  createGrid(){
    this.gridOptions = <GridOptions>{
      columnDefs: [
        {headerName: 'Name', field: 'name', suppressMovable: true },
        {headerName: 'Phone', field: 'phone', suppressMovable: true  },
        {headerName: 'Email', field: 'email', suppressMovable: true  }
      ],
      rowData: this.rowData,
      onGridReady: function (GridReadyEvent) {

      },
      onCellClicked: function (CellClickedEvent) {
        var rows = CellClickedEvent.api.getSelectedRows();
        console.log(rows[0].id);
      }
    }
  }

  //Populate Rows with Contacts
  populateRows(data: Contact[]): agRow[] {
    var rowData = new Array<agRow>(data.length);
    var index: number = 0;
    var namefl: string;
    for(let contact of data){
      namefl = contact.firstName.concat(" ").concat(contact.lastName);
      rowData[index] = {name: namefl, phone: contact.phone, email: contact.email, id: contact._id};
      index = index+1;
    }
    return rowData;
  }

  /*
  updateRowSelection(CellClickedEvent) {

  }*/
  

  //Do on page initialization
  ngOnInit(){
 
  }

}
  

