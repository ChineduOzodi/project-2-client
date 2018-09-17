import { FoodService } from './food.service';
import { environment } from './../../environments/environment';
import { User } from './../Models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const apiUrl = 'http://18.223.28.74:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalFiber: number;

  constructor(
    private router: Router,
    private http: HttpClient) { }

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
  * @param  username The user's username
  *
  * @return       An Observable which will broadcast the BamUser when it is retrieved
  */
  getUserByUsername(username: string): Observable<User> {
    console.log('[LOG] - In UserService.getUserByEmail()');
    return this.http.get<User>(apiUrl + 'users/login/' + username + '/', HTTP_OPTIONS);
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
    return this.http.post<User>(apiUrl + 'users/', user, HTTP_OPTIONS);
  }

  /**
   * This method is used to update the user's info in the database.
   * It's called from the dashboard component when the user edits their
   * personal information.
   * @param user The updated user
   */
  updateInfo(user: User): Observable<User> {
    console.log('[LOG] - In UserService.updateInfo()');
    console.log(user);
    return this.http.put<User>(apiUrl + `users/${user.uId}/`, JSON.stringify(user), HTTP_OPTIONS);
  }

  /**
   * Verifies that there is an active user session. If there is and the user info is missing,
   * will set local User data. If not will redirect to login/registration page
   */
  verifyUser() {
    if (sessionStorage.getItem('user')) {
      console.log('User session active');
      if (!this.user.value) {
        this.user.next(JSON.parse(sessionStorage.getItem('user')));
        console.log('Retrieved user from session');
      }
    } else {
      this.router.navigate(['']);
    }
  }

  /**
   * Clears the sessionStorage, service.user, and redirects to the login/register page
   */
  logoutUser() {
    sessionStorage.clear();
    this.user.next(null);
    this.router.navigate(['']);
  }
}
