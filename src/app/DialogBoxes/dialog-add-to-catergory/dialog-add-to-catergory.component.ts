import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-add-to-catergory',
  templateUrl: './dialog-add-to-catergory.component.html',
  styleUrls: ['./dialog-add-to-catergory.component.css']
})
export class DialogAddToCatergoryComponent implements OnInit {
  selected = 'option2';

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  saveCategory() {
    console.log('value');
  }

  addCatOne() {
    this.snackBar.open('You have added a breakfast item to your list!', '', {
      duration: 2000,
    });
    console.log('1');
  }
  addCatTwo() {
    this.snackBar.open('You have added a lunch item to your list!', '', {
      duration: 2000,
    });
    console.log('2');
  }
  addCatThree() {
    this.snackBar.open('You have added a dinner item to your list!', '', {
      duration: 2000,
    });
    console.log('3');
  }

}

