import { Component, OnInit, Input, Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';



@Component({
	selector: 'delete',
	templateUrl: 'delete.component.html'
})

export class DeleteComponent implements OnInit {

	 constructor(public dialogRef: MdDialogRef<DeleteComponent>) {}



	ngOnInit() { }
}