import { DialogRegistrationComponent } from './../../DialogBoxes/dialog-registration/dialog-registration.component';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { Router, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    // trigger listening for the changeState
    trigger('changeState', [
      state('void', style({
        opacity: 0

      })),
      state('state1', style({

        opacity: 1
      })
      ),
      transition('void => state1', [
        group([
          animate('1s ease-in', style({
            opacity: 1
          }))
        ])
      ]),
    ]),
    // trigger listening for the changeCover
    trigger('changeCover', [
      state('void', style({
        opacity: 0.3

      })),
      state('state2', style({

        opacity: 0
      })
      ),
      transition('void => state2', [
        group([
          animate('.5s ease-in', style({
            opacity: 0
          }))
        ])
      ]),
    ]),
    // trigger listening for the changeLogin
    trigger('changeLogin', [
      state('void', style({
        opacity: 0

      })),
      state('state3', style({

        opacity: 1
      })
      ),
      transition('void => state3', [
        group([
          animate('.5s .5s ease-in', style({
            opacity: 1
          }))
        ])
      ]),
    ]),
  ]
})

export class RegistrationComponent implements OnInit {

  state: String = 'state1';

  stateOne: String = 'state2';

  stateLogin: String = 'state3';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
    width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  ngOnInit() {
    this.state = 'state1';
    this.stateOne = 'state2';
    this.stateLogin = 'state3';
  }

}
