import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'contactlist',
	templateUrl: 'contactlist.component.html',
	styleUrls: ['contactlist.component.css']
})

export class ContactlistComponent implements OnInit {
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
  divisions = [
    {values: 'Bali'},
    {values: 'Jakarta'},
    {values: 'Yogyakarta'},
    {values: 'Bandung'}	
	
  ];
	ngOnInit() { }
	
}