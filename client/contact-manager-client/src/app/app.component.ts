import { Component } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contacts: Contact[] = new Array();
  constructor(private contactsService: ContactsService) {
    this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }
}
