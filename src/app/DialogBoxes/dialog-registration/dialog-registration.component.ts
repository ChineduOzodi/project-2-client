import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.css']
})
export class DialogRegistrationComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

  register() {
    this.dialogRef.close('Some information is going to be passed in here, either JSON or a String');
  }

}
