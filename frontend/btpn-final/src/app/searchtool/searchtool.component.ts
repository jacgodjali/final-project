import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AppService } from 'app/app.service';
import { DeleteComponent } from 'app/delete/delete.component';


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
  selectedOption: string;
  @Input() contact;
  @Output() delete = new EventEmitter();
  constructor(public dialog: MdDialog, private service: AppService) {}
	
  
onDelete() {
    this.delete.emit(this.contact);
  }
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
    
  openDialog() {
    let dialogRef = this.dialog.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
  ngOnInit() {
    this.service.getAll().subscribe(data => {
        this.contacts = data;
        console.log(this.contacts);
      });
    }
  }
