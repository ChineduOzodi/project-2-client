import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  bmi;
  ws; // weight status of bmi.
  weight;
  height;
  User;
  constructor() { }

  ngOnInit() {
  }


  bmiCalculator(pounds, feet, inches) {


    this.weight = pounds;
    this.height = (((feet * 12) + (inches)));
    inches = (inches + feet);
    this.bmi = (((this.weight / ((this.height) * (this.height))) * 703));
    this.bmi = (this.bmi * 100);
    this.bmi = Number.parseFloat(this.bmi).toFixed(2);
    this.weightCategory(this.bmi);
    return this.bmi;
  }

  weightCategory(x) {
    if (x < 18.5) {
      this.ws = 'Underweight';
      return this.ws;
    }
    if (x >= 18.5 && x <= 24.9) {
      this.ws = 'Normal or Healthy';
      return this.ws;
    }
    if (x >= 25.0 && x <= 29.9) {
      this.ws = 'Overweight';
      return this.ws;
    }
    if (x >= 30) {
      this.ws = 'Obese';
      return this.ws;
    }
  }

}

