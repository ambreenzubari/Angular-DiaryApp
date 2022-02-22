import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';
import { stringify } from 'querystring';
import { PhoneNumber } from 'src/app/Model/PhoneNumber';
import { PhoneNumbersService } from 'src/app/Services/phone-numbers.service';



@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {


  phoeneNumber_instance:PhoneNumber=new PhoneNumber();
  phoneNum:any;
  name:string;
  adress: string;
  phoneNumber='0';
  url="https://www.clipartmax.com/png/middle/110-1104174_computer-icons-user-clip-art-lily-pad-coloring-page.png"
  constructor(public phoneNumberService:PhoneNumbersService) {
    localStorage.getItem('user')
   console.log(phoneNumberService.fetchPhoneNumbers()) 
   }
 

  
  
  ngOnInit(): void {

    this.phoneNumberService.fetchPhoneNumbers().subscribe(data=>{
      this.phoneNum=data.map(e=>{

        return{
          id:e.payload.doc.id,
          isEdit:false,
          name:e.payload.doc.data()['name'],
          adress:e.payload.doc.data()['adress'],
          num: e.payload.doc.data()['phoneNumber'],
          url:e.payload.doc.data()['url']
        }
      })
      console.log(this.phoneNum)
    })
  }

  editItem(item, itemList)
  {

    this.name=item.name
    this.adress= item.adress;
    this.phoneNumber=item.num;
    this.allFalse(itemList)
    this.url=item.url;
    item.isEdit=true


  }


  // this will make you able to edit one contact one time

  allFalse(itemList){

    for(var i=0;i<itemList.length;i++)
    {
      itemList[i].isEdit=false
    }

  }
  deleteItem(item)
  {
    console.log("click on item delete")
    this.phoneNumberService.deleteItem(item.id)
    
  }

  onSelectFile(event:any)
  {
    if(event.target.files)
    {
      let reader=new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(event:any)=>{
        this.url=event.target.result
      }
    }
  }

  onSubmitEdit(item)
  {

    // let Record={};
    // Record["name"]=this.name;
    // Record["adress"]=this.adress;
    // Record["phoneNumber"]=this.phoneNumber;
    // Record["url"]=this.url;
    this.phoeneNumber_instance.name=this.name;
    this.phoeneNumber_instance.adress=this.adress;
    this.phoeneNumber_instance.phoneNumber=this.phoneNumber;
    this.phoeneNumber_instance.url=this.url;
    console.log(this.phoeneNumber_instance)
    this.phoneNumberService.editItemFireStore(item,JSON.parse(JSON.stringify(this.phoeneNumber_instance)));
    item.isEdit=false;
    console.log("item edited succesfully")
  }
  onSubmitCancel(item)
  {
    item.isEdit=false
  }
}
