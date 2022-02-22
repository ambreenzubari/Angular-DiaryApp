import { Component, OnInit } from '@angular/core';
import { PhoneNumbersService } from 'src/app/Services/phone-numbers.service';

@Component({
  selector: 'app-anav-bar',
  templateUrl: './anav-bar.component.html',
  styleUrls: ['./anav-bar.component.css']
})
export class AnavBarComponent implements OnInit {

  constructor( public phoneService: PhoneNumbersService) { }

  ngOnInit(): void {
  }

  logOut()
  {
    this.phoneService.logout();
  }
}
