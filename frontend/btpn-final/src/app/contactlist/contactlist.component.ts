import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { RefreshService } from 'app/refresh.service'
import { Subscription } from 'rxjs/Subscription';
import { AppService } from 'app/app.service';
import { DatePipe } from '@angular/common';
import { AddedComponent } from 'app/added/added.component';
import { Employee } from 'app/employee.model';
import { Location } from 'app/location.model';



@Component({
 selector: 'contactlist',
	templateUrl: 'contactlist.component.html',
	styleUrls: ['contactlist.component.css']
})

export class ContactlistComponent implements OnInit {
  contactForm;
  employee: Employee;
  location: Location;
  photo;
  image;
  isShow = false;
  employeeId = null;
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
      firstName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      lastName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      gender: this.formBuilder.control('', Validators.compose([Validators.required])),
      dateOfBirth: this.formBuilder.control('', Validators.compose([Validators.required])),
      nationality: this.formBuilder.control('', Validators.compose([Validators.required])),
      maritalStatus: this.formBuilder.control('', Validators.compose([Validators.required])),
      phone: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern(/^[0-9\(\)\-\+]{5,25}$/)])),
      subDivision: this.formBuilder.control('', Validators.compose([Validators.required])),
      status: this.formBuilder.control('', Validators.compose([Validators.required])),
      suspendDate: this.formBuilder.control('', Validators.compose([Validators.required])),
      hiredDate: this.formBuilder.control('', Validators.compose([Validators.required])),
      grade: this.formBuilder.control('', Validators.compose([Validators.required])),
      division: this.formBuilder.control('', Validators.compose([Validators.required])),
      email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
      location: this.formBuilder.control('', Validators.compose([Validators.required])),
    });

        this.service.getLocations()
      .subscribe(response => {
        this.locations = response
      });

      this.photo = "src/app/account.png";

    this.subscription = this.refreshService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'reset') {
        this.contactForm.reset();
        this.photo = "src/app/account.png";
        this.isShow = true;
      }
      else if (res.hasOwnProperty('option') && res.option === 'showToForm') {
        this.isShow = true;
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

        if (this.data.photo != null) {
          this.photo = this.data.photo;
        }
        else {
          this.photo = "src/app/account.png";
        }
      }
      else if (res.hasOwnProperty('option') && res.option === 'resetForm') {
        this.employeeId = null;
        this.contactForm.reset();
        this.photo = "src/app/account.png";
        this.isShow = false;
      }
    }
    )
  }

  onSubmit(employee){
    const location: Location = {
      id: employee.location,
      city:''
    };
    employee.location = location;
     if (this.photo != "src/app/account.png" && this.photo != null) {
      employee.photo = this.photo;
    }
    if (this.employeeId == null) {
      this.service.addContact(employee).subscribe(()=>{
        this.refreshService.notifyOther({ option: 'add', value: "" });
        this.contactForm.reset();
        this.photo = "src/app/account.png";
        this.isShow = false;  
      });
      
  }
  else {
      this.service.updateContact(this.employeeId, employee).subscribe(() => {
        this.refreshService.notifyOther({ option: 'add', value: "" });
        this.contactForm.reset();
        this.photo = "src/app/account.png";
        this.isShow = false;
      });
  }
}
chooseImage(event) {
    this.image = event.target.files;

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.photo = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  onSearch(location: Location) {
    if (this.employee.location !== undefined) {
      this.employee.location = location;
    }
  }
}