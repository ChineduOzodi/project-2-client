import { Component, OnInit, Inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CognitoService } from '../../Services/cognito.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})

export class DialogLoginComponent implements OnInit {

  // MESSAGES DISPLAYED TO USERS
  // Non-Error Information for Users
  infoMessage: String;
  Message = 'Login';
  // Error messages for Users.
  errorMessage: String;

  // FORM CONTROLS FOR LOGGING IN:
  loginForm = new FormBuilder().group({
    username: new FormControl('', Validators.compose([
      Validators.required
    ])),
    password: new FormControl('', Validators.required)
  });

  // Error types thrown when submissions are incorrect.
  loginValationMessages = {
    'username': [
      { type: 'required', message: 'Username is required!' }
    ],
    'password': [
      { type: 'required', message: 'Password is required!' }
    ]
  };

  constructor(
    public loginSnackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    private cognitoService: CognitoService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  /*User session is checked on page init, if session found
   *  it will fwd to user homepage instead of login screen.
   */

  ngOnInit() {
    if (sessionStorage.getItem('user')) {
      this.userService.user.next(JSON.parse(sessionStorage.getItem('user')));
      this.router.navigate(['userDash']);
    }
    /*
    New User Registration message,
    verify email sent to their inbox
    */
    const info = sessionStorage.getItem('info');
    if (info) {
      this.infoMessage = info;
    }
  }

  // user login message
  login() {
    // clear variable values if any are present.
    this.errorMessage = '';
    this.infoMessage = '';

    sessionStorage.clear();


    // are there any errors present in email or password?
    if (
this.loginForm.get('username').errors ||
this.loginForm.get('password').errors
) { // if so, throw this errorMessage.
        console.log(this.loginForm.get('password').value);
      this.errorMessage = 'Invalid login. Errors present.';
    } else { // no errors? validate user info for login then.
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      // grab a USER ID TOKEN from AWS COGNITO
      this.cognitoService.signIn(username, password).subscribe(
        response => {
          // checking for a valid response.
          if (response) {
            // if response contains a message, it'll be an error.
            if (response['message']) {
              this.errorMessage = response['message'];
              console.log(response);
              return;
            }

            // IF(response) !errors, then get info from user pool.
            console.log(response);
            this.userService.getUserByUsername(username).subscribe(
              user => {
                if (user) {
                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.userService.user.next(user);
                  console.log('Logged in and hit database');
                  this.dialogRef.close('Logged in.');
                  this.router.navigate(['home']);
                  this.loginSnackBar.open(this.userService.user.value.firstname, 'has logged in!', {
                    duration: 2000,
                  });
                }
              }
            );
          }
        }
      );
    }
  }


  // For the Login SnackBar
  logMeIn(name: string) {
    this.loginSnackBar.open(name, '', {
      duration: 3000,
    });

    // To close the dialog box and submit data
    this.dialogRef.close('Some information is going to be passed in here, either JSON or a String');


  }
}
