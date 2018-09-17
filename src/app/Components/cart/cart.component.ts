import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group, keyframes, query, stagger } from '@angular/animations';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
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
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
