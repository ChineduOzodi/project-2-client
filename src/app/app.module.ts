import { RegistrationComponent } from './Pages/registration/registration.component';
import { UserService } from './Services/user.service';
import { CognitoService } from './Services/cognito.service';
import { CourseDialogComponent } from './DialogBoxes/course-dialog-component/course-dialog-component';
import { MaterialModule } from './material';
import { LoginComponent } from './Pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { UserDashboardComponent } from './Pages/user-dashboard/user-dashboard.component';
import { CartComponent } from './Components/cart/cart.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontpageComponent } from './Pages/frontpage/frontpage.component';
import { RegistrationComponent } from './Pages/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    DashboardComponent,
    UserDashboardComponent,
    LoginComponent,
    CartComponent,
    FrontpageComponent,
    AnimateComponent,
    RegistrationComponent,
    CourseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    CourseDialogComponent
  ],
  providers: [CognitoService, UserService],
  bootstrap: [AppComponent]

})
export class AppModule { }
