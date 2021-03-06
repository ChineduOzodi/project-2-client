import { Item } from './../../Models/item';
import { FoodService } from './../../Services/food.service';
import { UserService } from './../../Services/user.service';
import { DialogAddToCatergoryComponent } from './../dialog-add-to-catergory/dialog-add-to-catergory.component';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../Services/data.service';
import { CoreNutrients } from '../../Objects/CoreNutrients';
import { trigger, state, style, animate, transition, group, keyframes, query, stagger } from '@angular/animations';
import { Nutrient } from '../../Models/nutrient';
import { Measures } from '../../Models/measures';
import { ItemList } from '../../Models/itemList';
import { ItemDescription } from '../../Models/itemDescription';
import { FoodDb } from '../../Models/FoodDb';


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
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
            style({ opacity: 1, transform: 'translateY(0px)', offset: 1 }),
          ]
          ))
        ]))
      ])


    ])
  ]
})
export class DialogSearchNutriComponent implements OnInit {
  /**
      * The navbar initial Position is set with this: right-of-book-normal, right-of-book-zoomed
      */
  navbarPosition: String = 'right-of-book-zoomed';


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
  constructor(private ds: DataService,
    public dialog: MatDialog,
    private userService: UserService,
    private foodService: FoodService
    ) { }

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
      // User's search
      this.ItemList = search.list.item;

    });
  }

  // 1.04 DETAILS BY ITEM NUMBER
  moreData(item: Item) {
    console.log(item);
    console.log(item.name);
    // Set data to be saved to db
    this.foodService.foodToSave = new FoodDb()  ;
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

      // console.log('Saving food to db');
      // this.foodService.saveFood(item.ndbno, 1, 0, 1, Date.now(), this.userService.user.value.uId).subscribe(() => {
      //   console.log('Saved to db');
      //   this.foodService.getFoodsFromDb();
      // });
    }
    );
  }

  // Save resulting item from the 'moreData()' func.
  saveItem(ndbno) {

    console.log(ndbno.desc.ndbno);
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
