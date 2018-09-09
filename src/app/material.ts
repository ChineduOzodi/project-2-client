// ts file for the use for Angular Materials
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule,
                MatSelectModule, MatInputModule, MatSnackBarModule, MatDialogModule],
    exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule,
                MatSelectModule, MatInputModule, MatSnackBarModule, MatDialogModule],
})
export class MaterialModule { }
