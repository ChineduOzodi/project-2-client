import { DialogAddToCatergoryComponent } from './../../DialogBoxes/dialog-add-to-catergory/dialog-add-to-catergory.component';
import { UserService } from './../../Services/user.service';
import { DialogSearchNutriComponent } from './../../DialogBoxes/dialog-search-nutri/dialog-search-nutri.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { trigger, state, style, animate, transition, group, keyframes, query, stagger } from '@angular/animations';



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  animations: [

    // animation for the book to enlarge when a button is clicked to navigate to the next page
    trigger('zoomInclosedBook', [
      state('small', style({
        width: 120, transform: 'scale(1.555) translateX(0)', opacity: 1
      })),
      state('large', style({
        transform: 'scale(1.555)',
      })),

      // To open the book and zoom in when page is switched
      transition('void => small', [
        style({ width: 10, transform: 'translateX(415px) translateY(-15%)', opacity: 0 }),
        group([
          animate('0.2s 1s ease-in', style({
            transform: ' scale(1.555) translateX(0)',
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
export class RecipeComponent implements OnInit {
  /**
   * The navbar initial Position is set with this: right-of-book-normal, right-of-book-zoomed
   */
  navbarPosition: String = 'right-of-book-zoomed';
  // When the app loads, the state becomes small
  state: String = 'small';

  constructor(
    public dialog: MatDialog,
    private userService: UserService
    ) { }

  ngOnInit() {
    // this.userService.verifyUser();
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

  // Add Category
  // openAddCategory() {
  //   const dialogRef = this.dialog.open(DialogAddToCatergoryComponent,
  //     {
  //       width: '80%'
  //     });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  zoomInMe() {

    // this.state = (this.state === 'small' ? 'large' : 'small')
    this.state = 'large';

  }

}
