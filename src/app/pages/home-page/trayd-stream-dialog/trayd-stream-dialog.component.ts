import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TraydStreamService } from 'src/app/modules/core/services/trayd-stream.service';

@Component({
  selector: 'app-trayd-stream-dialog',
  templateUrl: './trayd-stream-dialog.component.html',
  styleUrls: ['./trayd-stream-dialog.component.scss']
})
export class TraydStreamDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TraydStreamDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: {UUIDs: string[]},
    private traydStreamService: TraydStreamService,
    ) { }

  ngOnInit(): void {
  }

  addUUID() {
    this.data.UUIDs.push(this.generateUUID());
    this.traydStreamService.UUIDs = this.data.UUIDs;
  }

  private generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
