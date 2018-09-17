import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-add-to-catergory',
  templateUrl: './dialog-add-to-catergory.component.html',
  styleUrls: ['./dialog-add-to-catergory.component.css']
})
export class DialogAddToCatergoryComponent implements OnInit {

  category: number;

  constructor(public addCatSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  saveCategory() {
    console.log('value');
  }

  openSnackBar() {
    this.addCatSnackBar.open('You have added a breakfast item to your list!', '', {
      duration: 2000,
    });

  }
}
