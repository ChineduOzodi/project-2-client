import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { Router, Routes } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    // trigger listening for the changeState
    trigger('changeState', [
      state('void', style({
        opacity: 0

      })),
      state('state1', style({

        opacity: 1
      })
      ),
      transition('void => state1', [
        group([
          animate('1s ease-in', style({
            opacity: 1
          }))
        ])
      ]),
    ]),
    // trigger listening for the changeCover
    trigger('changeCover', [
      state('void', style({
        opacity: 0.3

      })),
      state('state2', style({

        opacity: 0
      })
      ),
      transition('void => state2', [
        group([
          animate('.5s ease-in', style({
            opacity: 0
          }))
        ])
      ]),
    ]),
  ]
})

export class LoginComponent implements OnInit {

  state: String = 'state1';

  stateOne: String = 'state2';

  constructor() { }
  // Soley for animation purposes
  // The member variable is named toState and is changed by the method changeState.

  ngOnInit() {
    this.state = 'state1';
    this.stateOne = 'state2';
  }

}
