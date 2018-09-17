import { loadQueryList } from '@angular/core/src/render3/instructions';
import { CategoryService } from './../../Services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CognitoService } from '../../Services/cognito.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/user';
import { NutrientsService } from '../../Services/nutrients.service';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.css']
})
export class DialogRegistrationComponent implements OnInit {

  message: string;
  errorMessage: string;
  registrationForm = new FormBuilder().group({
    userName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),

    email: new FormControl('', Validators.compose([
      Validators.required
      , Validators.email
    ])),

    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
    ])),

    confirmPassword: new FormControl('', Validators.required),

    firstName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ])),
    lastName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ]))
  });

  registrationValidationMessages = {
    'username': [
      { type: 'required', message: 'Username is required!' },
      { type: 'username', message: 'Not a valid username!' }
    ],
    'email': [
      { type: 'required', message: 'Email is required!' },
      { type: 'email', message: 'Not a valid email!' }
    ],
    'password': [
      { type: 'required', message: 'Password is required!' },
      { type: 'pattern', message: 'Password must contain: 1 lowercase letter, 1 uppercase letter, and 1 number!' },
      { type: 'minlength', message: 'Password must be at least 8 characters long!' }
    ],
    'firstName': [
      { type: 'required', message: 'First name is required' },
      { type: 'maxlength', message: 'First name must be 30 characters or less' }
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required' },
      { type: 'maxlength', message: 'Last name must be 30 characters or less' }
    ]
  };

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<DialogRegistrationComponent>,
    private cognitoService: CognitoService,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService,
    private nutrientsService: NutrientsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  passValid(conf: string) {
    if (this.registrationForm.get('password').value !== this.registrationForm.get('confirmPassword').value) {
      this.registrationForm.get('confirmPassword').setErrors([{ 'mismatch': true }]);
      this.message = 'Password mismatch';
    } else {
      this.registrationForm.get('confirmPassword').setErrors([{ 'mismatch': false }]);
      this.registrationForm.get('confirmPassword').updateValueAndValidity();
      this.message = '';
    }
  }

  getErrorMessage(field: string): string {
    let e = '';

    const validations = this.registrationValidationMessages[field];
    for (let i = 0; i < Object.keys(validations).length; i++) {
      const validation = validations[i];

      if (this.registrationForm.get('password').hasError(validation['type']) &&
        (this.registrationForm.get('password').dirty ||
          this.registrationForm.get('password').touched)) {
        e = validation['message'];
      }
    }


    return e;
  }

  register() {
    this.errorMessage = '';
    this.passValid(this.registrationForm.get('confirmPassword').value);
    if (
      this.registrationForm.get('userName').errors ||
      this.registrationForm.get('email').errors ||
      this.registrationForm.get('password').errors ||
      this.registrationForm.get('firstName').errors ||
      this.registrationForm.get('lastName').errors ||
      this.message
    ) {
      this.errorMessage = 'Please check form for errors.';
    } else {
      const username = this.registrationForm.get('userName').value;
      const email = this.registrationForm.get('email').value;
      const password = this.registrationForm.get('password').value;
      const firstName = this.registrationForm.get('firstName').value;
      const lastName = this.registrationForm.get('lastName').value;
      this.cognitoService.registerUser(email, username, password, firstName, lastName)
        .subscribe(result => {
          if (result) {
            // is there a response?
            if (result['message']) {
              // if so, its gonna be an error
              this.errorMessage = result['message'];
            } else { // no error, so, create user.
              const user: User = {
                username: username,
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password

              };

              this.userService.register(user).subscribe(
                u => {
                  if (u) {
                    console.log('User created, creating user categories');
                    this.categoryService.createUserCategory('Breakfast', u.u_id).subscribe(() => {
                      console.log('breakfast created');
                      this.categoryService.createUserCategory('Lunch', u.u_id).subscribe(() => {
                        console.log('lunch created');
                        this.categoryService.createUserCategory('Dinner', u.u_id).subscribe(() => {
                          console.log('dinner created');
                          console.log('getting nutrient data');
                          this.nutrientsService.getDefaultNutrients(u.sex, u.age).subscribe((nutri) => {
                            sessionStorage.setItem('info',
                              `Account confirmation email sent to ${user.email}, please confirm your account.`);
                            this.dialogRef.close('Registered.');
                          });
                        });
                      });
                    });
                  }
                }
              );
            }
          }
        }
        );
    }
  }
}
