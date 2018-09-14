import { Component, OnInit, Input } from '@angular/core';
import { loadQueryList } from '@angular/core/src/render3/instructions';
import { trigger, state, style, animate, transition, group, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-button-navbar',
  templateUrl: './button-navbar.component.html',
  styleUrls: ['./button-navbar.component.css'],
  animations: [

    // animation to move the button navbar to the right when the book is opened/zoomed in
    trigger('navBarRight', [
      state('right', style({ height: 10, transform: 'translateY(0px)', opacity: 1 })),
      transition('void => right', [
        style({ height: 10, transform: 'translateY(50px)', opacity: 0 }),
        group([
          animate('.5s .7s ease', style({
            transform: 'translateY(0px)',
            height: 145
          })),
          animate('1s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('right => void', [
        group([
          animate('2s ease', style({
            transform: 'translateY(0%)',
            height: 10
          })),
          animate('2s 3s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
/**
 * The main navbar component that is used to navigate through the website
 * @authors Chinedu Ozodi, Alex Moraga
 */
export class ButtonNavbarComponent implements OnInit {
  /**
   * The navbar initial Position is set with this: right-of-book-normal, right-of-book-zoomed.
   * This will can be overriden by injection into the component another components html
   */
  @Input()
  navbarPosition: String = 'right-of-book-normal';

  // When the app loads, the stateNav becomes right
   stateNav: String = 'right';

  constructor() { }

  ngOnInit() {
  }

  moveMeRight() {

    // this.state = (this.state === 'small' ? 'large' : 'small')
    this.stateNav = 'right';
  }

}
