import { Component, OnInit } from '@angular/core';
import { NutrientService } from '../../api/nutrient.service';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  food: Object[];
  foodgroups; // 1.02 Select Dropdown
  nutrient: Object;
  measure: Object[];
  itemList;
  selectedMeasure: string; // measure for 1.06

  acceptableNutrients =
    [539, 269, 208, 203, 204,
      205, 297, 295, 291, 301,
      303, 304, 305, 306, 307,
      309, 312, 315, 317, 401,
      404, 405, 406, 415, 435,
      418, 578, 318, 320, 323,
      573, 324, 430, 606, 645,
      646, 605, 601]; // 1.07 Filter Array


  constructor(private ns: NutrientService, private ds: DataService) { }
  ngOnInit() {

    // 1.02.1 activates the 1.02 dropdown menu on load.
    this.fgCats();
  }

  // 1.02a.2 function for the on init.
  fgCats() {

    this.ds.fgCats().subscribe(fg => {
      this.foodgroups = fg.list.item;

    }
    );

  }





  // 1.02b FREE SEARCH FUNCTION //
  search(string, select) {
    this.ds.searchData(string, select).subscribe(search => {
      this.itemList = search.list.item;
    });
  }

  // 1.04 DETAILS BY ITEM NUMBER
  moreData(data) {
    console.log(data);

    // setting the JSON data to obj 'selected'
    this.ds.specificData(data).subscribe(selected => {
      this.food = selected.foods[0].food.desc; // array of details for individual items
      this.nutrient = selected.foods[0].food.nutrients; // food item nutrient array.
      this.measure = selected.foods[0].food.nutrients[0].measures;
      this.selectedMeasure = this.measure[0].label; // measure for 1.06
    }
    );
  }

  // 1.07 Allowable Nutrients Filter
  // if it doesn't contain a nutrient # matching it will not show.
  checkFilter(x): Boolean {

    if (this.acceptableNutrients.includes(x)) {
      console.log('passed: ' + x);
      return true;
    } else {
      console.log('failed: ' + x);
      return false;
    }

  }



}
