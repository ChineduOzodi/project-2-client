import { UserDashboardComponent } from './../Pages/user-dashboard/user-dashboard.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class DataService {

  api; // the api will be instantiated in each method.

  // apiKey to enter the program, alterable by devs if deprecates.
  apiKey = 'api_key=iuHaJToUfme3uWpAq2m4qcjd0PJ4JT5csxWX6ey4';


  // core URLs for the API

  // Search by NDBNO
  // (food id num) = ndbno=######& , type = f means full data report returned.
  reportsURL = `https://api.nal.usda.gov/ndb/V2/reports?type=f&${this.apiKey}&`;
  ndbno; // part of the URL, it provides the specific info.
  num; // User clicks on options to see nutritional data.


  // Free Search by String
  searchURL = `https://api.nal.usda.gov/ndb/search/?${this.apiKey}&ds=Standard%20Reference&`;
  query; // user can free-search a string using this. query is the input information.
  fg;  // this is a drop-down select of the options.
  q;
  group;



  constructor(private http: HttpClient) { }

  /* 1.02a.2 Function in recipe.component.ts. */
  fgCats() {
    this.api = `https://api.nal.usda.gov/ndb/list?${this.apiKey}&lt=g`;


    return this.http.get(this.api);

  }
  /* end 1.02.2 */

  // 1.02b FREE SEARCH FUNCTION //
  searchData(searchParam, fgParam) {

    searchParam.replace(/' '/g, '%20');  // URL Encoding the Search Request **FIX**
    this.query = searchParam; // User Query information. Plugs into the q variable.
    this.group = fgParam; // The Food Group user chose from the drop-down.

    // to keep the url able to easily be edited in the future.
    this.q = `q=${this.query}&`;
    this.fg = `fg=${this.group}`;


    // setting the api as whatever was selected.
    this.api = this.searchURL + this.q + this.fg;

    return this.http.get(this.api);
  }
  // 1.02b  END FREE SEARCH FUNCTION //

  specificData(ndbno) {
    this.num = ndbno;
    ndbno = `ndbno=${this.num}`;
    this.api = this.reportsURL + ndbno;
    return this.http.get<any>(this.api);
  }
}

