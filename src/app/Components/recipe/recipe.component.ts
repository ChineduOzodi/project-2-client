import { DialogSearchNutriComponent } from './../../DialogBoxes/dialog-search-nutri/dialog-search-nutri.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openSearchNutri() {
    const dialogRef = this.dialog.open(DialogSearchNutriComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
  }

}
