import { FoodService } from './../../Services/food.service';
import { Item } from './../../Models/item';
import { DialogAddToCatergoryComponent } from './../../DialogBoxes/dialog-add-to-catergory/dialog-add-to-catergory.component';
import { UserService } from './../../Services/user.service';
import { DialogSearchNutriComponent } from './../../DialogBoxes/dialog-search-nutri/dialog-search-nutri.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition, group, keyframes, query, stagger } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../Services/data.service';
import { CoreNutrients } from '../../Objects/CoreNutrients';
import { Nutrient } from '../../Models/nutrient';
import { Measures } from '../../Models/measures';
import { ItemList } from '../../Models/itemList';
import { ItemDescription } from '../../Models/itemDescription';
import { FoodDb } from '../../Models/FoodDb';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [

    // animation for the book to enlarge when a button is clicked to navigate to the next page
    trigger('zoomInclosedBook', [
      state('small', style({
        width: 120, transform: 'scale(1.2) translateX(0)', opacity: 1
      })),
      state('fadeIn', style({
        transform: 'translateX(70%)', opacity: 1
      })),

      // To open the book and zoom in when page is switched
      transition('void => small', [
        style({ width: 10, transform: 'translateX(415px) translateY(-15%)', opacity: 0 }),
        group([
          animate('0.2s 1s ease-in', style({
            transform: ' scale(1.2) translateX(0)',
            width: 800
          })),
          animate('0.2s ease-in', style({
            opacity: 1
          }))
        ])
      ]),
    ])
  ]
})

export class SearchComponent implements OnInit {
  /**
     * The navbar initial Position is set with this: right-of-book-normal, right-of-book-zoomed
     */
  navbarPosition: String = 'right-of-book-zoomed';
  // When the app loads, the state becomes small
  state: String = 'small';


  stateOne: String = 'fadeIn';

  // <------------------------------------------Search Function

  foodgroups: ''; // 1.02 Select Dropdown
  itemList: any;
  selectedMeasure: string; // measure for 1.06
  core: Nutrient[];
  AllNutrient: Nutrient[];
  Measures: Measures[];

  searchColumns = ['ndbno', 'name', 'manu', 'controls'];
  specificColumns = ['nutrient', 'amount', 'percentage', 'controls'];

  foodProfile: ItemDescription;

  // User's item
  ItemList: ItemList[];

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



  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private ds: DataService,
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.userService.verifyUser();

    // 1.02.1 activates the 1.02 dropdown menu on load.
    this.fgCats();
  }

  openSearchNutri() {
    const dialogRef = this.dialog.open(DialogSearchNutriComponent,
      {
        width: '80%'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
      // User's search
      this.ItemList = search.list.item;

    });
  }

  // 1.04 DETAILS BY ITEM NUMBER
  moreData(item: Item) {
    console.log(item.name);
    // Set data to be saved to db
    this.foodService.foodToSave = new FoodDb();
    this.foodService.foodToSave.ndbno = item.ndbno;
    this.foodService.foodToSave.uId = this.userService.user.value.uId;
    this.foodService.foodToSave.timestamp = Date.now();

    // setting the JSON data to obj 'selected'
    this.ds.specificData(item.ndbno).subscribe((selected: any) => {

      this.AllNutrient = selected.foods[0].food; // array of details for individual items
      this.core = this.AllNutrient;
      this.Measures = selected.foods[0].food.nutrients[0].measures;
      this.selectedMeasure = this.Measures[0].label; // measure for 1.06
      console.log(selected.foods[0].food);

      // Save nutrient information
      this.foodService.foodToSave.measureIndex = 0;
      this.foodService.foodToSave.servingAmount = 1;
      this.foodService.foodToSave.mealCatId = 1;

      console.log('Saving food to db');
      this.foodService.saveFood(item.ndbno, 1, 0, 1, Date.now(), this.userService.user.value.uId).subscribe(() => {
        console.log('Saved to db');
        this.foodService.getFoodsFromDb();
      });
    }
    );
  }

  // Save nutrient data
  saveNutrient(nutrient: Nutrient) {

  }



  // 1.07 Allowable Nutrients Filter
  // if it doesn't contain a nutrient # matching it will not show.
  checkFilter(x): Boolean {
    const y = x.nutrient_id;
    if (this.acceptableNutrients.includes(y)) {

      return true;
    } else {

      return false;
    }

  }

  // Add Category
  openAddCategory() {
    const dialogRef = this.dialog.open(DialogAddToCatergoryComponent,
      {
        width: '80%'
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


