import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trayd-stream-dialog',
  templateUrl: './trayd-stream-dialog.component.html',
  styleUrls: ['./trayd-stream-dialog.component.scss']
})
export class TraydStreamDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<TraydStreamDialog>) { }

  ngOnInit(): void {
  }

}
