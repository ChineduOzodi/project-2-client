import { Component, OnInit } from '@angular/core';
import { NutrientService } from '../../api/nutrient.service';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  title = ('Please Search');
  results = '';
  myHero = 'Windstorm';
  food: Object[];
  nutrient: Object;
  measure: Object[];
  itemList;
  size;
  selectedMeasure: string;

  acceptableNutrients =
    [539, 269, 208, 203, 204,
    205, 297, 295, 291, 301,
    303, 304, 305, 306, 307,
    309, 312, 315, 317, 401,
    404, 405, 406, 415, 435,
    418, 578, 318, 320, 323,
    573, 324, 430, 606, 645,
    646, 605, 601];


  constructor(private ns: NutrientService, private ds: DataService) { }
  ngOnInit() {
  }
// FREE SEARCH FUNCTION //
search(string, select) {
this.ds.searchData(string , select).subscribe(search => {
  this.itemList = search.list.item;
});
}

// DETAILS BY ITEM NUMBER
moreData(data) {
  console.log(data);
this.ds.specificData(data).subscribe(selected => {
  this.food = selected.foods[0].food.desc;
  this.nutrient = selected.foods[0].food.nutrients;
  this.measure = selected.foods[0].food.nutrients[0].measures;
  this.selectedMeasure = this.measure[0].label;
}
);
  }

  checkFilter(x): Boolean {

    if ( this.acceptableNutrients.includes(x)) {
      console.log('passed: ' + x);
      return true;
    } else {
      console.log('failed: ' + x);
return false;
    }

  }



}
