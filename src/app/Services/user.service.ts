import { environment } from './../../environments/environment';
import { User } from './../Models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const apiUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  /**
  * This method will get user info from the database based on
  * the email address. This method is called from the login
  * component to get the user's info.
  *
  * IMPORTANT:
  * This may need to be changed in future sprints when the
  * microservices backend is connected. Depending on how
  * the services are setup, the http request may not actually
  * function.
  *
  * @param  email The user's email address
  *
  * @return       An Observable which will broadcast the BamUser when it is retrieved
  */
  getUserByEmail(email: string): Observable<User> {
    console.log('[LOG] - In UserService.getUserByEmail()');
    return this.http.get<User>(apiUrl + 'users?email=' + email, HTTP_OPTIONS);
  }

  /**
  * This method will add a new user to the database.
  *
  * @param  user  A BamUser object that contains the user data
  *
  * @return       An Observable that will broadcast the BamUser when it has been inserted into the database
  */
  register(user: User): Observable<User> {
    console.log('[LOG] - In UserService.register()');
    return this.http.post<User>(apiUrl + 'register', user, HTTP_OPTIONS);
  }

  /**
   * This method is used to update the user's info in the database.
   * It's called from the dashboard component when the user edits their
   * personal information.
   * @param user The updated user
   */
  updateInfo(user: User): Observable<User> {
    console.log('[LOG] - In UserService.updateInfo()');
    return this.http.put<User>(apiUrl + `users/${user.u_id}`, JSON.stringify(user),  HTTP_OPTIONS);
  }
}
