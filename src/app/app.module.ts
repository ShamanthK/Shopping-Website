import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { appRoutes } from './routes';
import { ExplorepageComponent } from './components/explorepage/explorepage.component';
import { ProductsComponent } from './components/products/products.component';
import { SelectedproductComponent } from './components/selectedproduct/selectedproduct.component';
import { CategoryComponent } from './components/category/category.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './ngRx/product.reducer';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessOrderComponent } from './components/success-order/success-order.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    ExplorepageComponent,
    ProductsComponent,
    SelectedproductComponent,
    CategoryComponent,
    CheckoutComponent,
    SuccessOrderComponent,
    LoginComponent,
    SideNavComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ categoryProducts: productReducer }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
