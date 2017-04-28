import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'app/app.service';

@Component({
	selector: 'contactlist',
	templateUrl: 'contactlist.component.html',
	styleUrls: ['contactlist.component.css']
})

export class ContactlistComponent implements OnInit {
  form;
  @Input() data: any = [];
  constructor(private postService:AppService) {}
  sex = [
    {values: 'Female'},
    {values: 'Male'}
  ];
  grades = [
    {values: 'SE - JP'},
    {values: 'SE - PG'},
    {values: 'SE - AP'},
    {values: 'SE - AN'}
	
	
  ];
  location = [
    {values: 'Jakarta'},
    {values: 'Bali'},
    {values: 'Bandung'},
    {values: 'Yogyakarta'}	
  ];
  divisions = [
    {values: 'BTPN Jenius'},
    {values: 'CDC AsteRx'},
    {values: 'SWD Green'},
    {values: 'SWD Pink'},
    {values: 'Finance & Accounting'}
  ];

  
	ngOnInit() { 
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName : new FormControl(''),
      gender : new FormControl(''),
      dateOfBirth : new FormControl(''),
      nationality : new FormControl(''),
      maritalStatus : new FormControl(''),
      phone : new FormControl(''),
      subDivision : new FormControl(''),
      status : new FormControl(''),
      suspendDate : new FormControl(''),
      hiredData : new FormControl(''),
      grade : new FormControl(''),
      div : new FormControl(''),
      email : new FormControl('')
    });
  }
  onSubmit(item){
      console.log(item);
      this.postService.post(item);
  }
	
}