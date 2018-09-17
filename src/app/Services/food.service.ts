import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodDb } from './../Models/FoodDb';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
 const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
 /**
 * Used to get and save food for the logged in user
 * @authors Chinedu Ozodi
 */
@Injectable({
  providedIn: 'root'
})
export class FoodService {
   userFoods: FoodDb[];
   constructor(
    private http: HttpClient,
    private userService: UserService,
    private dataService: DataService
    ) { }
   /**
   * Gets food from database for the logged in user. Will error out if no logged in user in the user service
   */
  getFoodsFromDb() {
    return this.http.get(environment.dbUrl + 'plan/user/' + this.userService.user.value.u_id).subscribe( (foods: FoodDb[]) => {
      this.userFoods = foods;
      if (foods && foods.length > 0) {
        this.updateFoodsWithApiData(0);
      }
    });
  }
   /**
   * Pull api information to get full information for a given FoodDb in the this.userFoods list.
   * Recursively moves up the index until all of the indexes are hit
   * @param index Index to update
   */
  private updateFoodsWithApiData(index: number) {
    this.dataService.specificData(this.userFoods[index].ndbno).subscribe((item) => {
      // update food
      this.userFoods[index].foodName = item.foods[0].food.desc.name;
      for (let i = 0; i < item.foods[0].food.nutrients.length; i++) {
        if ( environment.acceptableNutrients.includes(item.foods[0].food.nutrients[i].nutritient_id)) {
          this.userFoods[index].nutrients.push(item.foods[0].food.nutrients[i]);
        }
      }
      this.userFoods[index].measureName = this.userFoods[index].nutrients[0].measures[this.userFoods[index].measureIndex].label;
      if (index < this.userFoods.length) {
        index++;
        this.updateFoodsWithApiData(index);
      }
    });
  }
   /**
   * Saves the food information to the db
   * @param ndbno ndbo from api
   * @param mealCatId meal cat id selected by user
   * @param measureIndex measure index selected by user
   * @param servingAmount serving amount selected by user
   * @param timestamp date/time food eaten
   * @param uId id of user
   */
  saveFood(ndbno: string, mealCatId: number, measureIndex: number, servingAmount: number, timestamp: Date, uId: number ) {
    const food: FoodDb = new FoodDb();
    food.ndbno = ndbno;
    food.mealCatId = mealCatId;
    food.measureIndex = measureIndex;
    food.servingAmount = servingAmount;
    food.timestamp = timestamp;
    food.uId = uId;
    return this.http.post(environment.dbUrl + 'plan/user/', food, HTTP_OPTIONS);
  }
 }
