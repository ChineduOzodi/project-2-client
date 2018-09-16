import { Item } from './../Models/Item';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { DialogSearchNutriComponent} from '../DialogBoxes/dialog-search-nutri/dialog-search-nutri.component';

// TODO: Replace this with your own data model type
// export interface FoodInfoTableItem {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application


/**
 * Data source for the FoodInfoTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FoodInfoTableDataSource extends DataSource<Item> {
  userItems: Item[];

  constructor(private paginator: MatPaginator, private sort: MatSort, private res: DialogSearchNutriComponent) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Item[]> {
    this.userItems = this.res.item;
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.userItems),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.userItems.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.userItems]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(userItems: Item[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return userItems.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(userItems: Item[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return userItems;
    }

    return userItems.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.manu, +b.manu, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
