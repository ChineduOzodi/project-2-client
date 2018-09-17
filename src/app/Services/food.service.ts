import { Nutrient } from './../Models/nutrient';
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

    foodToSave: FoodDb;
   /**
   * Gets food from database for the logged in user. Will error out if no logged in user in the user service
   */
  getFoodsFromDb() {
    console.log('Getting foods from db');
    this.http.get(environment.dbUrl + 'plan/user/' + this.userService.user.value.uId + '/').subscribe( (foods: FoodDb[]) => {
      console.log('Foods request complete: ' + foods.length);
      console.log(foods);
      this.userFoods = foods;
      console.log(this.userFoods.length);
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
    console.log('starting to update food item index: ' + index);
    console.log(this.userFoods.length);
    this.dataService.specificData(this.userFoods[index].ndbno).subscribe((item) => {
      // update food
      console.log('done updating food item index: ' + index);
      // console.log(item.foods[0].food.nutrients[0]);
      this.userFoods[index].foodName = item.foods[0].food.desc.name;
      this.userFoods[index].nutrients = [];
      for (let i = 0; i < item.foods[0].food.nutrients.length; i++) {
        if ( environment.acceptableNutrients.includes(item.foods[0].food.nutrients[i].nutrient_id)) {
          this.userFoods[index].nutrients.push(item.foods[0].food.nutrients[i]);
        }
      }
      this.userFoods[index].measureName = this.userFoods[index].nutrients[0].measures[this.userFoods[index].measureIndex].label;
      if (++index < this.userFoods.length) {
        this.updateFoodsWithApiData(index);
      } else {
        // update the total carbs and stuff
        this.userService.totalCarbs = 0;
        this.userService.totalFats = 0;
        this.userService.totalFiber = 0;
        this.userService.totalProtein = 0;

        this.userService.percentCarbs = 0;
        this.userService.percentFats = 0;
        this.userService.percentFiber = 0;
        this.userService.percentProtein = 0;

        for ( let i = 0; i < this.userFoods.length; i++) {
          for (let k = 0; k < this.userFoods[i].nutrients.length; k++) {
            if (this.userFoods[i].nutrients[k].nutrient_id === 203) {
              this.userService.totalProtein += this.userFoods[i].nutrients[k].value;
              this.userService.percentProtein += this.userFoods[i].nutrients[k].value / this.userService.user.value.protein * 100;
            }
            if (this.userFoods[i].nutrients[k].nutrient_id === 205) {
              this.userService.totalCarbs += this.userFoods[i].nutrients[k].value;
              this.userService.percentCarbs += this.userFoods[i].nutrients[k].value / this.userService.user.value.carbohydrates * 100;
            }
            if (this.userFoods[i].nutrients[k].nutrient_id === 291) {
              this.userService.totalFiber += this.userFoods[i].nutrients[k].value;
              this.userService.percentFiber += this.userFoods[i].nutrients[k].value / this.userService.user.value.fiber * 100;
            }
            if (this.userFoods[i].nutrients[k].nutrient_id === 204) {
              this.userService.totalFats += this.userFoods[i].nutrients[k].value;
              this.userService.percentFats += this.userFoods[i].nutrients[k].value / this.userService.user.value.fat * 100;
            }
          }
        }
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
  saveFood(ndbno: string, mealCatId: number, measureIndex: number, servingAmount: number, timestamp: number, uId: number ) {
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
