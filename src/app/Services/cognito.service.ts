import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { CognitoIdToken } from 'amazon-cognito-identity-js';
import { BehaviorSubject } from 'rxjs';

// blackapple

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private userPool: AWSCognito.CognitoUserPool;

  /**
  * When the cognito service is intialized, it creates the user pool.
  * In a future sprint, I would recommend that these credentials not
  * be hard coded. I didn't have the time to fix this when I was working
  * on the project.
  */
  constructor() {
    const poolData = {
      UserPoolId: 'us-east-2_1gxC74pTz',
      ClientId: '387jgqg6g55k6pqf50tbf939vj'
    };

    this.userPool = new AWSCognito.CognitoUserPool(poolData);
  }

  /**
  * This method will create a new user in the cognito user pool. When
  * a user is created, cognito will send that user an email to verify
  * their email account.
  *
  * @param  email     The new user's email address
  * @param username   The new user's username
  * @param  password  The new user's password
  * @param  firstName The new user's first name
  * @param  lastName  The new user's last name
  */
  registerUser(email: string, username: string, password: string, firstName: string, lastName: string): BehaviorSubject<object> {
    console.log('[LOG] - In CognitoService.registerUser()');
    console.log('password = ' + password);

    const attributeList = [];

    // First add the user data to some data objects. The Name attribute
    // is the name of the user attribute in the cognito user pool.
    const emailData = {
      Name: 'email',
      Value: email
    };

    const userNameData = {
      Name: 'preferred_username',
      Value: username
    };

    const firstNameData = {
      Name: 'given_name',
      Value: firstName
    };

    const lastNameData = {
      Name: 'family_name',
      Value: lastName
    };

    // Wrap up the data objects as cognito user attributes
    const emailAttribute = new AWSCognito.CognitoUserAttribute(emailData);
    const userNameAttribute = new AWSCognito.CognitoUserAttribute(userNameData);
    const firstNameAttribute = new AWSCognito.CognitoUserAttribute(firstNameData);
    const lastNameAttribute = new AWSCognito.CognitoUserAttribute(lastNameData);

    // Add everything to the list of attributes
    attributeList.push(emailAttribute);
    attributeList.push(userNameAttribute);
    attributeList.push(firstNameAttribute);
    attributeList.push(lastNameAttribute);

    // Attempt to add the new user to the pool
    console.log('[LOG] cognito.service - attempting to add user ' + firstName);
    const resultStream = new BehaviorSubject<object>(null);
    this.userPool.signUp(username, password, attributeList, null,
      (error, result) => {
        if (error) {
          console.log('[LOG] cognito.service - error occured');
          console.log(error);
          resultStream.next(error);
        }
        if (result) {
          console.log('[LOG] cognito.service - addition success!');
          resultStream.next(result);
        }
      }
    );

    return resultStream;
  }

  /**
   * This method attempts to sign in the user. If the user is in the pool,
   * it returns a CognitoIdToken. Otherwise it returns an error object.
   * @param username The username that the user entered
   * @param password The password that the user entered
   */
  signIn(username: string, password: string): BehaviorSubject<object> {
    const userData = {
      Username: username,
      Pool: this.userPool
    };

    const authenticationData = {
      Username: username,
      Password: password
    };

    const authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);

    const cognitoUser = new AWSCognito.CognitoUser(userData);

    const resultStream = new BehaviorSubject<object>(null);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (session: AWSCognito.CognitoUserSession) {
        console.log('[LOG] - Cognito login succeeded');
        resultStream.next(session.getIdToken());
      },
      onFailure: function (err: any) {
        console.log('[ERROR] - Failed to authenticate user');
        resultStream.next(err);
      }
    });

    return resultStream;
  }
}
