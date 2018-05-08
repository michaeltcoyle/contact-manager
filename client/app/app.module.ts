import { BrowserModule } from '@angular/platform-browser/src/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core/src/core';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component'

@NgModule({
    imports:        [BrowserModule, BrowserAnimationsModule],
    declarations:   [AppComponent],
    bootstrap:  [AppComponent]
})
export class AppModule { }