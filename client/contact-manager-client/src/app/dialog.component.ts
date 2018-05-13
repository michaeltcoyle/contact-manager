import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent {
  @Input
  ('okText') okText: string;
  @Input
  ('cancelText') cancelText: string;
  @Input
  ('valueEmitted') valueEmitted: any;

  constructor() {
    this.okText = 'OK';
    this.cancelText = 'Cancel';
   }
   
   emitValue(value) {
    //this.valueEmitted.emit(value);
   }


}
