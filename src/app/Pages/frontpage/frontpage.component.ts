import { DialogLoginComponent } from '../../DialogBoxes/dialog-login/dialog-login.component';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition, group } from '@angular/animations';
import { DialogRegistrationComponent } from './../../DialogBoxes/dialog-registration/dialog-registration.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
  animations: [
    // trigger listening for the changeState
    trigger('animateClosedBook', [
      state('state1', style({

        transform: 'translateX(0)'
      })),
      state('state2', style({

        transform: 'translateX(51.5%)',
        opacity: 0
      })
    ),
      transition('state1 => state2', [
        group([
          animate('.75s ease-in', style({
            transform: 'translateX(50.0%)',
          })),
          animate('1.5s .75s ease-in', style({
            opacity: .3
          }))
        ])
      ]),
    ]),
  ]
})

export class FrontpageComponent implements OnInit {

  state: String = 'state1';

  constructor(private router: Router, public dialog: MatDialog) {}

  registerMe() {
    this.state = 'state2';
    this.switchToRegist();
  }

  // function to re-route in ___ milliseconds
  switchPage() {
    setTimeout(() => {
      this.router.navigate(['/login'], )}
      , 1500);
  }

  // function to go to the registration page
  switchToRegist() {
    setTimeout(() => {
      this.router.navigate(['/registration'], )}
      , 1500);
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
    width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openLogInDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
    width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.state = 'state2';
    });


  }

  ngOnInit() {
  }

}
