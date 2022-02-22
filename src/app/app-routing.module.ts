import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './Contacts/add-contact/add-contact.component';
import { HomeComponentComponent } from './auth/home-component/home-component.component';
import { ListContactsComponent } from './Contacts/list-contacts/list-contacts.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgetPassComponent } from './auth/forget-pass/forget-pass.component';
const routes: Routes = [

  {path:'ForgetPass', component: ForgetPassComponent},
  { path: 'Addontact', component:  AddContactComponent },
  {path:'AllContacts', component: ListContactsComponent},

  { path: '', component: HomeComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})


export class AppRoutingModule { }
