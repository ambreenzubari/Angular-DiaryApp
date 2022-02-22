import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { async } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumbersService {
  user=null
  isLoggedIn=false;
  fireService:AngularFirestore;
  
  constructor(public fireS:AngularFirestore, public firebaseAuth:AngularFireAuth, private router:Router)  {
    this.fireService=fireS;
    console.log("auth state: ",firebaseAuth.authState)
    this.firebaseAuth.authState.subscribe(m_user=>{
      this.user=m_user.uid
      console.log(m_user)
    })
    }


  async getUser()
  {

    // this.user=((await this.firebaseAuth.currentUser).uid)    
    //this.user= JSON.parse(window.localStorage.getItem('user')).uid
  }
  async singnin(email: string, password: string)
  {
    this.firebaseAuth.setPersistence('local').then(()=>{
     this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(async res=>{
        this.isLoggedIn=true;  
        
        console.log(JSON.parse(JSON.stringify(res.user.uid)))
        this.user=res.user.uid
        this.router.navigateByUrl('/AllContacts')
       // localStorage.setItem('user', JSON.stringify(res.user))
      }).catch(e=>{
        console.log(e)
        alert(e)
      })
  
    })
  }

  async singnUp(email: string, password: string, confirm: string)
  {
    if(password===confirm)
    {
      if(password.length>6)
      {
        await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
       .then(res=>{
        var Record={
          "email": email,
          "password": password
        }
    
        this.isLoggedIn=true;
      //  localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate[('/AllContacts')]
      //  this.getUser()

        this.router.navigateByUrl('/AllContacts')

      }).catch(e=>{
        console.log(e)
        alert(e)
      })
    }
    else
      alert("length of password must be greater than 6")  
  }
  else
  {
    alert("password and confirm password must be same")
  }

  }

  forgetPassword(email:string)
  {
    this.firebaseAuth.sendPasswordResetEmail(email).then(()=>{
      alert('verificatoin email has been sent to your email')
        this.router.navigateByUrl('')
       }
   ).catch(err=>{
     alert(err)
   })
  }
  logout()
  {
  //  localStorage.removeItem('user');
    console.log(  "After log out",  localStorage.removeItem('user'))
    this.firebaseAuth.signOut();

    this.isLoggedIn=false;
  }
  async createNewPhoneNumber(Record){

   this.getUser()
    console.log(Record)
    return this.fireService.collection("Users").doc(this.user).collection("PhoneNumber").add(Record)
    }


  fetchPhoneNumbers(){
   this.getUser()
    console.log(this.user)
    return this.fireService.collection("Users").doc(this.user).collection("PhoneNumber").snapshotChanges()

  }

  editItemFireStore(item, Record)
  {
    console.log("Update", Record)
 
    this.fireService.collection("Users").doc(this.user).collection("PhoneNumber").doc(item.id).update(Record)
  }

  deleteItem(item)
  {
    console.log(item)
    console.log("item deleted succesfully")
    return this.fireService.collection("Users").doc(this.user).collection("PhoneNumber").doc(item).delete()
    }

}

