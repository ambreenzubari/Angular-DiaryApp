import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PhoneNumbersService } from './Services/phone-numbers.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Diary App';

  user:any;
  constructor(public phoneNumberService:PhoneNumbersService,public firebaseAuth:AngularFireAuth, public router:Router) { 
    this.user=null
    // this.isSignIn=false
    
    this.firebaseAuth.authState.subscribe(m_user=>{
      console.log("UId",m_user.uid)
      this.user=m_user.uid
      
      if(this.user!=null)
      {
        console.log(":here")
        this.router.navigateByUrl('/AllContacts')
      }

      
      console.log(m_user)
    })
    // phoneNumberService.logout()
  }

  
}
