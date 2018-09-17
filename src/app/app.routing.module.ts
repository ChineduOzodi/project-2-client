// Used for navigation, like href
import { FrontpageComponent } from './Pages/frontpage/frontpage.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { CartComponent } from './Components/cart/cart.component';
import { UserDashboardComponent } from './Pages/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './Components/search/search.component';



const routes: Routes = [
    {path: '', component: FrontpageComponent},
    {path: 'home', component: DashboardComponent},
    {path: 'userDash', component: UserDashboardComponent},
    {path: 'cart', component: CartComponent},
    {path: 'search', component: SearchComponent},
    {path: 'recipe', component: RecipeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
