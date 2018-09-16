import { DialogEditUserInfoComponent } from './../../DialogBoxes/dialog-edit-user-info/dialog-edit-user-info.component';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    // trigger listening for the changeState
    trigger('appearOpenBook', [
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
    trigger('disappearClosedBook', [
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

export class DashboardComponent implements OnInit {

  userName: String = 'Alex Moraga';

  state: String = 'state1';

  stateOne: String = 'state2';

  constructor(
    public dialog: MatDialog,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.state = 'state1';
    this.stateOne = 'state2';
    this.userService.verifyUser();
  }

  openEditInfo(): void {
    const dialogRef = this.dialog.open(DialogEditUserInfoComponent, {
    width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
