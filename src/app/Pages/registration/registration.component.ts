import { DialogRegistrationComponent } from './../../DialogBoxes/dialog-registration/dialog-registration.component';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { User } from './../../Models/user';
import { CognitoService } from './../../Services/cognito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}


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

  // This string is used when we check if the password field matches
  // the confirm password field
  message: string;

  // This string is used to display registration errors to the user
  errorMessage: string;

  newUser = new User();

  animal: string;
  name: string;


  constructor(
    private userService: UserService,
    private cognitoService: CognitoService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  /**
  * TODO: Document or remove this method
  */
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

  /**
  * This method implements the registration functionality. It checks that
  * the input is valid and then makes the call to the cognito service to
  * register the user in the cognito user pool.
  */
  register() {
    // There are no form errors. Attempt to create a new user in cognito.
    const username = this.newUser.username;
    const email = this.newUser.email;
    const password = this.newUser.password;
    const firstName = this.newUser.f_name;
    const lastName = this.newUser.l_name;
    this.cognitoService.registerUser(email, username, password, firstName, lastName).subscribe(
      result => {
        if (result) {
          // If the operation returned an error
          if (result['message']) {
            this.errorMessage = result['message'];
          } else {
            const user: User = {
              username: username,
              f_name: firstName,
              l_name: lastName,
              email: email,
              password: password
            };
            this.userService.register(user).subscribe(
              u => {
                if (u) {
                  sessionStorage.setItem('info',
                  'Your account has been created. Please click the verification link in the email we sent you and login here.');
                  this.router.navigate(['login']);
                }
              }
            );
          }
        }
      }
    );
  }
}
