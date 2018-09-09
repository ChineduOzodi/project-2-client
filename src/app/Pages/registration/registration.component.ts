import { User } from './../../Models/user';
import { CognitoService } from './../../Services/cognito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // This string is used when we check if the password field matches
  // the confirm password field
  message: string;

  // This string is used to display registration errors to the user
  errorMessage: string;

  newUser = new User();

  constructor(
    private userService: UserService,
    private cognitoService: CognitoService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.cognitoService.registerUser(email, password, firstName, lastName).subscribe(
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
