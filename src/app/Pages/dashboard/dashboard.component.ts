import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
    // trigger listening for the changeLogin
    trigger('changeLogin', [
      state('void', style({
        opacity: 0

      })),
      state('state3', style({

        opacity: 1
      })
      ),
      transition('void => state3', [
        group([
          animate('.5s .5s ease-in', style({
            opacity: 1
          }))
        ])
      ]),
    ]),
  ]
})

export class DashboardComponent implements OnInit {

  state: String = 'state1';

  stateOne: String = 'state2';

  stateLogin: String = 'state3';

  constructor() { }

  ngOnInit() {
    this.state = 'state1';
    this.stateOne = 'state2';
    this.stateLogin = 'state3';
  }

}
