import { UserService } from './Services/user.service';
import { CognitoService } from './Services/cognito.service';
import { MaterialModule } from './material';
import { DialogLoginComponent } from './DialogBoxes/dialog-login/dialog-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { UserDashboardComponent } from './Pages/user-dashboard/user-dashboard.component';
import { CartComponent } from './Components/cart/cart.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontpageComponent } from './Pages/frontpage/frontpage.component';
import { DialogRegistrationComponent } from './DialogBoxes/dialog-registration/dialog-registration.component';
import { ButtonNavbarComponent } from './Components/button-navbar/button-navbar.component';
import { DialogSearchNutriComponent } from './DialogBoxes/dialog-search-nutri/dialog-search-nutri.component';
import { DialogEditUserInfoComponent } from './DialogBoxes/dialog-edit-user-info/dialog-edit-user-info.component';
import { MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatRadioButton, MatRadioGroup } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FoodInfoTableComponent } from './food-info-table/food-info-table.component';
import { DialogAddToCatergoryComponent } from './DialogBoxes/dialog-add-to-catergory/dialog-add-to-catergory.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    DashboardComponent,
    UserDashboardComponent,
    CartComponent,
    FrontpageComponent,
    DialogRegistrationComponent,
    ButtonNavbarComponent,
    DialogSearchNutriComponent,
    RecipeComponent,
    DialogEditUserInfoComponent,
    DialogLoginComponent,
    FoodInfoTableComponent,
    DialogAddToCatergoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,

    MatSortModule
  ],
  entryComponents: [
    DialogRegistrationComponent,
    DialogLoginComponent,
    DialogSearchNutriComponent,
    DialogEditUserInfoComponent,
    DialogAddToCatergoryComponent
  ],
  providers: [CognitoService, UserService],
  bootstrap: [AppComponent]

})
export class AppModule { }
