import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/common/home/home.component';
import { DetailComponent } from './components/common/detail/detail.component';
import { CanActivateCart } from './components/cart/guards/CanActivateCart';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "detail", component: DetailComponent },
  { path: "cart", loadChildren: './components/cart/cart.module#CartModule' ,canActivate: [CanActivateCart]},
  { path: 'singUp', loadChildren: './components/sing-up/sing-up.module#SingUpModule' },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
