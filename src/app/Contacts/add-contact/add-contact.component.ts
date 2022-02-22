import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { PhoneNumber } from 'src/app/Model/PhoneNumber';
import { PhoneNumbersService } from 'src/app/Services/phone-numbers.service';



@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(public phoneNumberService:PhoneNumbersService, public firebaseDatabase:AngularFireStorage, ) { 

  }
 

  file:File

  phoneNumber_instance: PhoneNumber=new PhoneNumber();
  // p=new PhoneNumbersService();
  url="https://www.clipartmax.com/png/middle/110-1104174_computer-icons-user-clip-art-lily-pad-coloring-page.png"

  addContact=new FormGroup({
    name:new FormControl(''),
    adress:new FormControl(''),
    phoneNumber:new FormControl('')
  })
  ngOnInit(): void {
  }
  onSelectFile(event:any)
  {
    let temp=event.target.files[0]
    console.log(temp)
    // if(event.target.files)
    {
      let reader=new FileReader();
      reader.readAsDataURL(temp)
      reader.onload=(event:any)=>{
        this.url=event.target.result
        this.file=temp
        alert("here")
        console.log(this.file)
      }
    }
  }

  onSubmit()
  {

    console.log(this.url)
    this.phoneNumber_instance.name=this.addContact.value.name;
    this.phoneNumber_instance.adress=this.addContact.value.adress;
    this.phoneNumber_instance.url=this.url;
    this.phoneNumber_instance.phoneNumber=this.addContact.value.phoneNumber;

    if(this.file!=undefined)
    {
      let storageRef=this.firebaseDatabase.storage.ref()
   
      const task: AngularFireUploadTask = this.firebaseDatabase.upload(
        this.file.name,
        this.file
      );
      task
          .snapshotChanges()
          .pipe(
          finalize(() => {
              storageRef.getDownloadURL().then(async downloadURL => {
                  console.log(downloadURL);
                  this.url=downloadURL;

                        await new Promise(r => setTimeout(r, 2000));
              }).catch(e=>{
                alert(e)
              });
        })
    )
    .subscribe();
  
    }

    this.phoneNumber_instance.url=this.url;


    this.phoneNumberService.createNewPhoneNumber(JSON.parse(JSON.stringify(this.phoneNumber_instance))).then(res=>{
      this.addContact=new FormGroup({
        name:new FormControl(''),
        adress:new FormControl(''),
        phoneNumber:new FormControl('')
      })     
       this.url="https://www.clipartmax.com/png/middle/110-1104174_computer-icons-user-clip-art-lily-pad-coloring-page.png";
      
    }).catch(error=>{
        console.log(error)
    });

  }
}