import { Routes } from "@angular/router";
import { CategoryComponent } from "./components/category/category.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ProductsComponent } from "./components/products/products.component";
import { SelectedproductComponent } from "./components/selectedproduct/selectedproduct.component";

export const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: SelectedproductComponent },
    { path: 'category/:id', component: CategoryComponent },
    { path: 'checkout', component: CheckoutComponent },
  ]