import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneNumbersService } from 'src/app/Services/phone-numbers.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {

  constructor(public phoneNumberService:PhoneNumbersService,public firebaseAuth:AngularFireAuth, public router:Router) { }


  forgetPassForm=new FormGroup({
    email:new FormControl('')
  })
  ngOnInit(): void {
  }
  onSubmit()
  {
   
   this.phoneNumberService.forgetPassword(this.forgetPassForm.value.email)
  }
}
