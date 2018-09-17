import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FoodInfoTableDataSource } from './food-info-table-datasource';

@Component({
  selector: 'app-food-info-table',
  templateUrl: './food-info-table.component.html',
  styleUrls: ['./food-info-table.component.css']
})
export class FoodInfoTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FoodInfoTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new FoodInfoTableDataSource(this.paginator, this.sort);
  }
}
