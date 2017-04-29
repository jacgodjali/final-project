import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AppService } from 'app/app.service';
import { DeleteComponent } from 'app/delete/delete.component';
import { FilterComponent } from 'app/filter/filter.component';
import { lookupListToken } from 'app/provides';
import { Subscription } from 'rxjs/Subscription';
import { RefreshService } from 'app/refresh.service';

@Component({
  selector: 'searchtool',
  templateUrl: 'searchtool.component.html',
  styleUrls: ['searchtool.component.css']
})

export class SearchtoolComponent implements OnInit {
  ascend = "ascend";
  descend = "descend";
  contacts;
  name;
  hidden = false;
  selectedOption: string;
  genderValue;
    locationValue;
    locations;
  @Input() contact;

  private subscription: Subscription;
  constructor(public dialog: MdDialog, private service: AppService,
 private refreshService:RefreshService) {}
	
  

  ascending() {
    this.service.sorting(this.ascend)
    .subscribe(result =>{
      this.contacts = result;
    });
  }
   descending() {
    this.service.sorting(this.descend)
    .subscribe(result =>{
      this.contacts = result;
    });
  } 
  onSearch(event) {
    this.name = event.target.value;
    console.log(this.name);
   this.service.searchName(this.name)
      .subscribe(contacts => {
        this.contacts = contacts;
      });
    }
    openFilterDialog() {
    let dialogRef = this.dialog.open(FilterComponent);
  }
  openDialog() {
    let dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
    onClick(empId) {
    this.service.getContactById(empId)
      .subscribe(contacts => {
        this.contact = contacts
        console.log(this.contact);
      });
    this.hidden = true;
  }

  onDelete(id) {
    this.service.onDelete(id)
      .subscribe(id => {
        this.service.getAll().
          subscribe(data => {
            this.contacts = data;
            this.hidden = false;
          });
      });
  
  }


  ngOnInit() {
    this.service.getAll().subscribe(data => {
        this.contacts = data;
        console.log(this.contacts);
      });
       this.subscription = this.refreshService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'refresh') {
        this.contacts = res.value;
      }
      else if (res.hasOwnProperty('option') && res.option === 'add') {
        this.service.getAll()
          .subscribe(data => {
            this.contacts = data
          });
      }
        });
  }
}
