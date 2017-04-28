import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AppService } from 'app/app.service';


@Component({
	selector: 'delete',
	templateUrl: 'delete.component.html'
})

export class DeleteComponent implements OnInit {
	contactToDel = [];
onMediaItemDelete(mediaItem) {
    this.AppService.delete(mediaItem)
      .subscribe(() => {
        this.getMediaItems(this.medium);
      });
  }
    getMediaItems(medium) {
    this.medium = medium;
    this.AppService.get(medium)
      .subscribe(mediaItems => {
        this.mediaItems = mediaItems;
      });
  }
	 constructor(public dialogRef: MdDialogRef<DeleteComponent>) {}

	ngOnInit() { }
}