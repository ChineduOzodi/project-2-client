import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/user';


@Component({
  selector: 'app-dialog-edit-user-info',
  templateUrl: './dialog-edit-user-info.component.html',
  styleUrls: ['./dialog-edit-user-info.component.css']
})
export class DialogEditUserInfoComponent implements OnInit {
  user: User;
  uid;
  constructor(public us: UserService,
    public dialogRef: MatDialogRef<DialogEditUserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.user = this.us.user.value;
  }

  updateUser() {
    this.user.sex = parseInt(this.user.sex, 10);
    console.log(this.user);
    this.us.updateInfo(this.user).subscribe(() => {
      this.us.user.next(this.user);
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.dialogRef.close();
    });
  }
}
