import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-dialog-edit-user-info',
  templateUrl: './dialog-edit-user-info.component.html',
  styleUrls: ['./dialog-edit-user-info.component.css']
})
export class DialogEditUserInfoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogEditUserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
