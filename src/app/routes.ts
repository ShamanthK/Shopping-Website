import { Routes } from "@angular/router";
import { CategoryComponent } from "./components/category/category.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ProductsComponent } from "./components/products/products.component";
import { SelectedproductComponent } from "./components/selectedproduct/selectedproduct.component";
import { AuthGuardService } from "./services/auth-guard.service";

export const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] },
    { path: 'products/:id', component: SelectedproductComponent, canActivate: [AuthGuardService] },
    { path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuardService] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  ]