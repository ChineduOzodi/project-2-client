import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-add-to-catergory',
  templateUrl: './dialog-add-to-catergory.component.html',
  styleUrls: ['./dialog-add-to-catergory.component.css']
})
export class DialogAddToCatergoryComponent implements OnInit {


  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  saveCategory() {
    console.log('value');
  }

  addCat(category: String) {
    if (category === '1') {
      this.snackBar.open('You have added a breakfast item to your list!', '', {
        duration: 2000,
      });
      console.log('1');
    } else if (category === '2') {
      this.snackBar.open('You have added a lunch item to your list!', '', {
        duration: 2000,
      });
      console.log('2');
    } else {
      this.snackBar.open('You have added a dinner item to your list!', '', {
        duration: 2000,
      });
      console.log('3');
    }

  }
}
