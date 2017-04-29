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
  id;
  @Input() contact;

  private subscription: Subscription;
  constructor(public dialog: MdDialog, private service: AppService,
    private refreshService: RefreshService) {}



  ascending() {
    this.service.sorting(this.ascend)
      .subscribe(result => {
        this.contacts = result;
      });
  }
  descending() {
    this.service.sorting(this.descend)
      .subscribe(result => {
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
  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'yes') {
        this.doDelete();
      }

    });
  }
  doDelete() {
  console.log(this.contact.empId);
    this.service.onDelete(this.contact.empId).subscribe(data => {
        this.refreshService.notifyOther(
          {option: 'deletedId', value: data});
      });

  }
  onClick(empId) {
    this.service.getContactById(empId)
      .subscribe(contacts => {
        this.contact = contacts
        console.log(this.contact);
        this.refreshService.notifyOther({ option: "showToForm", value: this.contact });
      });
    this.hidden = true;
  }

 addContact() {
    this.refreshService.notifyOther({ option: 'reset', value: "" });
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
      else if (res.hasOwnProperty('option') && res.option === 'update') {
        this.service.getAll()
          .subscribe(data => {
            this.contacts = data
          });
      }
       else if (res.hasOwnProperty('option') && res.option === 'deletedId') {
        this.service.getAll()
          .subscribe(data => {
            this.contacts = data
          });
      }
        });
  }
}
