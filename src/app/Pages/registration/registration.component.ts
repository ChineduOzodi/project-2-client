import { Component, OnInit } from '@angular/core';
import { CognitoService } from '@caliatys/cognito-service';
import { CognitoConst } from '../../cognito.const';
import { RespType } from '@caliatys/cognito-service'; // Enum used to identify the responses (onSucces, onFailure, ...)
import { AuthType } from '@caliatys/cognito-service'; // Enum used to identify the providers (google, facebook, ...)
import { from } from 'rxjs';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  public cognitoService: CognitoService = new CognitoService(CognitoConst);

  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  createUser() {
    console.log('creating user:' + this.username + ', ' + this.password);
    this.cognitoService.adminCreateUser(this.username, this.password).subscribe(res => {
      console.log('Registeration returned something');
      console.log(res);
     }, err => {
       console.log('An error occured');
       console.log(err);
      });
  }


}
