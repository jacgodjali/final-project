import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { RefreshService } from 'app/refresh.service'
import { Subscription } from 'rxjs/Subscription';
import { AppService } from 'app/app.service';
import { DatePipe } from '@angular/common';
import { AddedComponent } from 'app/added/added.component';


@Component({
 selector: 'contactlist',
	templateUrl: 'contactlist.component.html',
	styleUrls: ['contactlist.component.css']
})

export class ContactlistComponent implements OnInit {
  contactForm;
  id;
  data;
  genders = [
  {value: 'Female', viewValue: 'Female'},
  {value: 'Male', viewValue: 'Male'}
]
grades = [
  {value: 'SE-JP', viewValue: 'SE-JP'},
  {value: 'SE-PG', viewValue: 'SE-PG'},
  {value: 'SE-AP', viewValue: 'SE-AP'},
  {value: 'SE-AN', viewValue: 'SE-JP'}
]
divs = [
  {value: 'BTPN Jenius', viewValue: 'BTPN Jenius'},
  {value: 'CDC AsteRx', viewValue: 'CDC AsteRx'},
  {value: 'SWD Pink', viewValue: 'SWD Pink'}
]
locations = [
  {value: 'Bali', viewValue: 'Bali'},
  {value: 'Bandung', viewValue: 'Bandung'},
  {value: 'Jakarta', viewValue: 'Jakarta'},
  {value: 'Yogyakarta', viewValue: 'Yogyakarta'}  
]

  private subscription: Subscription
  constructor(private formBuilder: FormBuilder, public dialog: MdDialog,
    private refreshService: RefreshService, private service:AppService,
    private datepipe:DatePipe) { }


openDialog() {
    let dialogRef = this.dialog.open(AddedComponent);
  }

  ngOnInit() {

    this.contactForm = this.formBuilder.group({
      empId: this.formBuilder.control(''),
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      gender: this.formBuilder.control(''),
      dateOfBirth: this.formBuilder.control(''),
      nationality: this.formBuilder.control(''),
      maritalStatus: this.formBuilder.control(''),
      phone: this.formBuilder.control(''),
      subDivision: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
      suspendDate: this.formBuilder.control(''),
      hiredDate: this.formBuilder.control(''),
      grade: this.formBuilder.control(''),
      division: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      location: this.formBuilder.control(''),
    });

    this.subscription = this.refreshService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'reset') {
        this.contactForm.reset();
      }
      else if (res.hasOwnProperty('option') && res.option === 'showToForm') {
        this.data=res.value;
        let tempDate = "";
        console.log(this.data);
        this.contactForm.controls['empId'].setValue(this.data.empId);
        this.contactForm.controls['firstName'].setValue(this.data.firstName);
        this.contactForm.controls['lastName'].setValue(this.data.lastName);
        this.contactForm.controls['gender'].setValue(this.data.gender);
        
        var contactDob = new Date(this.data.dateOfBirth);
        tempDate = this.datepipe.transform(contactDob, 'yyyy-MM-dd');

        this.contactForm.controls['dateOfBirth'].setValue(tempDate);
        this.contactForm.controls['nationality'].setValue(this.data.nationality);
        this.contactForm.controls['maritalStatus'].setValue(this.data.maritalStatus);
        this.contactForm.controls['phone'].setValue(this.data.phone);
        this.contactForm.controls['status'].setValue(this.data.status);

        var contactSupendedDate = new Date(this.data.suspendDate);
        tempDate = this.datepipe.transform(contactDob, 'yyyy-MM-dd');

        this.contactForm.controls['suspendDate'].setValue(tempDate);

         var contactHiredDate = new Date(this.data.hiredDate);
        tempDate = this.datepipe.transform(contactDob, 'yyyy-MM-dd');

        this.contactForm.controls['hiredDate'].setValue(tempDate);
        this.contactForm.controls['grade'].setValue(this.data.grade);
        this.contactForm.controls['division'].setValue(this.data.division);
        this.contactForm.controls['subDivision'].setValue(this.data.subDivision);
        this.contactForm.controls['email'].setValue(this.data.email);
        this.contactForm.controls['location'].setValue(this.data.location.city);

      }
    }
    )
  }

  onSubmit(formValue){
  // if(this.id===undefined) {
    this.service.addContact(formValue).subscribe(()=>{
                this.refreshService.notifyOther({ option: 'add', value: "" });
            });
  }
//   else if(this.id==this.data.empId) {
// this.service.updateContact(this.data.empId, formValue).subscribe(()=>{
//                 this.refreshService.notifyOther({ option: 'update', value: "" });
//             });
//   }
  // }

}