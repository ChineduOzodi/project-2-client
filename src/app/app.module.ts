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
import { MatCardModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    DashboardComponent,
    UserDashboardComponent,
    DialogLoginComponent,
    CartComponent,
    FrontpageComponent,
    DialogRegistrationComponent,
    ButtonNavbarComponent,
    DialogSearchNutriComponent,
    RecipeComponent,
    DialogEditUserInfoComponent
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
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogRegistrationComponent,
    DialogLoginComponent,
    DialogSearchNutriComponent,
    DialogEditUserInfoComponent
  ],
  providers: [CognitoService, UserService],
  bootstrap: [AppComponent]

})
export class AppModule { }
