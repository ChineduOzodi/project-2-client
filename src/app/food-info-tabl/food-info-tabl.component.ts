import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FoodInfoTablDataSource } from './food-info-tabl-datasource';

@Component({
  selector: 'app-food-info-tabl',
  templateUrl: './food-info-tabl.component.html',
  styleUrls: ['./food-info-tabl.component.css']
})
export class FoodInfoTablComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FoodInfoTablDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new FoodInfoTablDataSource(this.paginator, this.sort);
  }
}
