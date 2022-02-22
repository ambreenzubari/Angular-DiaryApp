import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListContactsComponent } from './Contacts/list-contacts/list-contacts.component';

import { AddContactComponent } from './Contacts/add-contact/add-contact.component';

import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat"
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { SideBarComponent } from './layout/side-bar/side-bar.component'
import { AnavBarComponent } from './layout/anav-bar/anav-bar.component';
import { HomeComponentComponent } from './auth/home-component/home-component.component';
import { ForgetPassComponent } from './auth/forget-pass/forget-pass.component';
@NgModule({
  declarations: [
    AppComponent,
    ListContactsComponent,
    AddContactComponent,
    AnavBarComponent,
    HomeComponentComponent,
    SideBarComponent,
    ForgetPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
