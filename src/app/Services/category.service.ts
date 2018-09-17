import { environment } from './../../environments/environment.prod';
import { Category } from './../Models/Category';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * Stores the user categories and allows for creating new categories, saving, and updating categories
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  userCategories: Category[];

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  getUserCategories() {
    this.http.get(environment.dbUrl + `user-category/${this.userService.user.value.u_id}/`).subscribe((cats: Category[]) => {
      this.userCategories = cats;
    });
  }

  createUserCategory(catName: string, uId: number) {
    const cat = new Category();
    cat.mealCatName = catName;
    cat.uId = uId;
    return this.http.post(environment.dbUrl + 'user-category/' + cat.uId, cat, HTTP_OPTIONS);
  }
}
