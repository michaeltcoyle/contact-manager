import { BrowserModule } from '@angular/platform-browser/src/platform-browser';
import { NgModule } from '@angular/core/src/core';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component'

@NgModule({
    imports:        [BrowserModule],
    declarations:   [AppComponent],
    bootstrap:  [AppComponent]
})
export class AppModule { }