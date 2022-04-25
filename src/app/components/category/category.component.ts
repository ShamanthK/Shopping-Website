import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCart, sendProducts } from 'src/app/ngRx/product.actions';
import {
  getCartItems,
  getCategoryProducts,
} from 'src/app/ngRx/product.selector';
import { AppState } from 'src/app/ngRx/product.state';
import { Product } from 'src/app/Product';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  productState$: Observable<string>;
  cartItems$: Observable<Product[]>;
  cartItems: Product[];
  addedToCart: Product[];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value: number = 50;
  isLoading: boolean = true;

  constructor(
    private store: Store<AppState>,
    private product: ProductsService
  ) {}

  ngOnInit(): void {
    this.productState$ = this.store.select(getCategoryProducts);
    this.productState$.subscribe(product => {
      console.log('category: ', product);
      this.product.getProductByCategory(product).subscribe(data => {
        this.cartItems$ = this.store.select(getCartItems);
        this.cartItems$.subscribe(cart => {
          this.cartItems = cart;
          // console.log(cart)
          this.addedToCart = [];
          data.forEach((p: any) => {
            if (this.cartItems.filter(f => f.id === p.id).length > 0) {
              p = { ...p, incart: true };
              this.addedToCart.push(p);
            } else {
              p = { ...p, incart: false };
              this.addedToCart.push(p);
            }
          });
          this.store.dispatch(sendProducts({ product: this.addedToCart }));
          this.isLoading = false;
        });
      });
    });
  }
}
