import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RefreshService } from 'app/refresh.service'
import { Subscription } from 'rxjs/Subscription';
import { AppService } from 'app/app.service'

@Component({
 selector: 'contactlist',
	templateUrl: 'contactlist.component.html',
	styleUrls: ['contactlist.component.css']
})

export class ContactlistComponent implements OnInit {
  contactForm;
  id;
  data;
  private subscription: Subscription
  constructor(private formBuilder: FormBuilder,
    private refreshService: RefreshService, private service:AppService) { }


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
        console.log(this.data);
        this.contactForm.controls['empId'].setValue(this.data.empId);
        this.contactForm.controls['firstName'].setValue(this.data.firstName);
        this.contactForm.controls['lastName'].setValue(this.data.lastName);
        this.contactForm.controls['gender'].setValue(this.data.gender);
        this.contactForm.controls['dateOfBirth'].setValue(this.data.dateOfBirth);
        this.contactForm.controls['nationality'].setValue(this.data.nationality);
        this.contactForm.controls['maritalStatus'].setValue(this.data.maritalStatus);
        this.contactForm.controls['phone'].setValue(this.data.phone);
        this.contactForm.controls['status'].setValue(this.data.status);
        this.contactForm.controls['suspendDate'].setValue(this.data.suspendDate);
        this.contactForm.controls['hiredDate'].setValue(this.data.hiredDate);
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