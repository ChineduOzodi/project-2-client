// ts file for the use for Angular Materials
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule,
                MatSelectModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatIconModule,
                MatExpansionModule],
    exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule,
                MatSelectModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatIconModule,
                MatExpansionModule],
})
export class MaterialModule { }
