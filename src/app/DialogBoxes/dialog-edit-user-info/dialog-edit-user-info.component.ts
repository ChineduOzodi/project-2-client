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
  User: User;
  uid;
  constructor( public us: UserService,
    public dialogRef: MatDialogRef<DialogEditUserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.uid = this.us.user.value.uId;
  }


  updateUser(fname, lname, gender, age) {
    this.User = {
      uId: this.uid,
      firstname: fname,
      lastname: lname,
      sex: gender,
      age: age
    };
    console.log(this.User);

this.us.updateInfo(this.User);
this.dialogRef.close();
  }
}
