import { Component, OnInit, Inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})

export class DialogLoginComponent implements OnInit {

  constructor(public loginSnackBar: MatSnackBar, private router: Router, public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  redirectMe() {
    this.switchPage();
  }

  // function to re-route in ___ milliseconds
  switchPage() {
    setTimeout(() => {
      this.router.navigate(['/home'])
    }
      , 1500);
  }

  // For the Loggin SnackBar
  logMeIn(name: string) {
    this.loginSnackBar.open(name, '', {
      duration: 3000,
    });

    // To close the dialog box and submit data
    this.dialogRef.close('Some information is going to be passed in here, either JSON or a String');

    // method from frontPageComponent to redirect page to dashboard
    this.redirectMe();

  }

  ngOnInit() {
  }

}
