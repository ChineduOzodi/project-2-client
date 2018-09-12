// ts file for the use for Angular Materials
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule, MatSelectModule],
    exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule, MatSelectModule],
})
export class MaterialModule { }
