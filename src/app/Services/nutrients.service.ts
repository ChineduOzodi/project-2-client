import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NutrientsService {

  constructor(
    private http: HttpClient
    ) { }

  getDefaultNutrients(sex: number, age: number) {
    return this.http.get(environment.dbUrl + `macro-nutrients/${age}/${sex}`);
  }
}
