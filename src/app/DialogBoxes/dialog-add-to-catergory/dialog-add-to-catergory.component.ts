import { UserService } from './../../Services/user.service';
import { FoodService } from './../../Services/food.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-add-to-catergory',
  templateUrl: './dialog-add-to-catergory.component.html',
  styleUrls: ['./dialog-add-to-catergory.component.css']
})
export class DialogAddToCatergoryComponent implements OnInit {
  selected = 1;

  constructor(public snackBar: MatSnackBar,
    private foodService: FoodService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  saveCategory() {
    console.log('value');
  }

  addCatOne() {
    this.foodService.saveFood(this.foodService.foodToSave.ndbno, 1, 0, this.selected,
       Date.now(), this.userService.user.value.uId).subscribe(() => {
      console.log('Saved to db');
      this.foodService.getFoodsFromDb();
    });
    this.snackBar.open('You have added a breakfast item to your list!', '', {
      duration: 2000,
    });
    console.log('1');
    console.log('Saving food to db');
  }
  addCatTwo() {
    this.foodService.saveFood(this.foodService.foodToSave.ndbno, 2, 0, this.selected,
       Date.now(), this.userService.user.value.uId).subscribe(() => {
      console.log('Saved to db');
      this.foodService.getFoodsFromDb();
    });
    this.snackBar.open('You have added a lunch item to your list!', '', {
      duration: 2000,
    });
    console.log('2');
  }
  addCatThree() {
    this.foodService.saveFood(this.foodService.foodToSave.ndbno, 3, 0, this.selected,
       Date.now(), this.userService.user.value.uId).subscribe(() => {
      console.log('Saved to db');
      this.foodService.getFoodsFromDb();
    });
    this.snackBar.open('You have added a dinner item to your list!', '', {
      duration: 2000,
    });
    console.log('3');
  }
}

