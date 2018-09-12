import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition, group } from '@angular/animations';

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

        transform: 'translateX(51.5%)',
        opacity: 0
      })
    ),
      transition('state1 => state2', [
        group([
          animate('.75s ease-in', style({
            transform: 'translateX(50.0%)',
          })),
          animate('1.5s .75s ease-in', style({
            opacity: .3
          }))
        ])
      ]),
    ]),
  ]
})

export class FrontpageComponent implements OnInit {

  state: String = 'state1';

  constructor(private router: Router) {}
  // Soley for animation purposes
  // The member variable is named toState and is changed by the method changeState.
  animateMe() {
    this.state = 'state2';
    this.switchPage();
  }

  // function to re-route in ___ milliseconds
  switchPage() {
    setTimeout(() => {
      this.router.navigate(['/login'], )}
      , 1500);
  }

  ngOnInit() {
  }

}
