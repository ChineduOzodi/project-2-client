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
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTreeModule} from '@angular/material/tree';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule,
                MatSelectModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatIconModule,
                MatExpansionModule, MatCardModule, MatProgressBarModule, MatTreeModule],
    exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule,
                MatSelectModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatIconModule,
                MatExpansionModule, MatCardModule, MatProgressBarModule, MatTreeModule],
})
export class MaterialModule { }
