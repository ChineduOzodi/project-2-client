import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../Services/data.service';
import { CoreNutrients } from '../../Objects/CoreNutrients';
import { trigger, state, style, animate, transition, group, keyframes, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-dialog-search-nutri',
  templateUrl: './dialog-search-nutri.component.html',
  styleUrls: ['./dialog-search-nutri.component.css'],
  animations: [

    trigger('listAnimation', [

      // any to any state
      transition('* => *', [

        // on enter, set opacity to zero. It's defaulted to false
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0px)', offset: 1}),
          ]
          ))
        ]))
      ])


    ])
  ]
})
export class DialogSearchNutriComponent implements OnInit {

  food: any;
  foodgroups; // 1.02 Select Dropdown
  nutrient: any;
  measure: any;
  itemList: any;
  core: CoreNutrients;
  selectedMeasure: string; // measure for 1.06

  acceptableNutrients =
    [601, 307, 291, 205, 204, 203, 208, 269]; // 1.07 Filter Array


  totalNutrients =
    [539, 269, 208, 203, 204,
      205, 297, 295, 291, 301,
      303, 304, 305, 306, 307,
      309, 312, 315, 317, 401,
      404, 405, 406, 415, 435,
      418, 578, 318, 320, 323,
      573, 324, 430, 606, 645,
      646, 605, 601]; // Future Implementation of nutrition.


  constructor(private ds: DataService) { }

  ngOnInit() {

    // 1.02.1 activates the 1.02 dropdown menu on load.
    this.fgCats();
  }

  // 1.02a.2 function for the on init.
  fgCats() {

    this.ds.fgCats().subscribe((fg: any) => {
      this.foodgroups = fg.list.item;

    }
    );

  }

  // 1.02b FREE SEARCH FUNCTION //
  search(string, select) {
    this.ds.searchData(string, select).subscribe((search: any) => {
      this.itemList = search.list.item;
    });
  }

  // 1.04 DETAILS BY ITEM NUMBER
  moreData(data) {
    console.log(data);

    // setting the JSON data to obj 'selected'
    this.ds.specificData(data).subscribe((selected: any) => {
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
      return true;
    } else {
      console.log('failed: ' + x);
      return false;
    }

  }
}
