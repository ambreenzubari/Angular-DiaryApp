import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumbersService } from 'src/app/Services/phone-numbers.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {



  user:any
  email: string;
  password: string;
  confirm: string;
  isSignIn:boolean;
  
  signInForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })

  signUpForm=new FormGroup({
    email: new FormControl(''),
    password:new FormControl(''),
    confirmPassword:new FormControl('')
  })

  constructor(public phoneNumberService:PhoneNumbersService,public firebaseAuth:AngularFireAuth, public router:Router) { 
    this.user=null
    this.isSignIn=false
  }

  ngOnInit(): void {

  }

  onSignUp()
  {
    console.log(this.signUpForm.value)
    this.phoneNumberService.singnUp(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.confirmPassword);
  }
  onSignIn()
  {
 
    console.log("vales-=-------",this.signInForm.value.password)
    this.phoneNumberService.singnin(this.signInForm.value.email, this.signInForm.value.password);
  }

  onClicksignIn_p()
  {
    this.isSignIn=false
  }
  onCreateAccount_p()
  {
    this.isSignIn=true
  }

  
}
