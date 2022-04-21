import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCart } from 'src/app/ngRx/product.actions';
import {
  getCartItems,
  getCategoryProducts,
} from 'src/app/ngRx/product.selector';
import { AppState } from 'src/app/ngRx/product.state';
import { Product } from 'src/app/Product';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  productState$: Observable<Product[]>;
  cartItems$: Observable<Product[]>;
  cartItems: Product[];
  addedToCart: Product[];
  faCheck = faCheck;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productState$ = this.store.select(getCategoryProducts);
    this.productState$.subscribe(data => {
      this.cartItems$ = this.store.select(getCartItems);
      this.cartItems$.subscribe(cart => {
        this.cartItems = cart;
        // console.log(cart)
        this.addedToCart = [];
        data.forEach(p => {
          if (this.cartItems.filter(f => f.id === p.id).length > 0) {
            p = { ...p, incart: true };
            this.addedToCart.push(p);
          } else {
            p = { ...p, incart: false };
            this.addedToCart.push(p);
          }
        });
      });
    });
  }

  addtoCart(product: any) {
    this.store.dispatch(addToCart({ product: product }));
  }
}
