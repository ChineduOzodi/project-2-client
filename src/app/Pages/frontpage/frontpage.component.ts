import { Component, OnInit, Input} from '@angular/core';
import {trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
  animations: [
    // trigger listening for the changeState
    trigger('changeState', [
      state('state1', style({
        transform: 'translateX(0)'
      })),
      state('state2', style({
        transform: 'translateX(51.5%)'
      })),
      transition('state1 => state2', animate('300ms ease-in')),
    ]),
  ]
})
export class FrontpageComponent implements OnInit {

  state: String = 'state1';

  constructor() { }
  // Soley for animation purposes
  // The member variable is named toState and is changed by the method changeState.
  animateMe() {
    this.state = 'state2';
  }
  ngOnInit() {
  }

}
