import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Product';
import { ProductsService } from 'src/app/services/products.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngRx/product.state';
import { addToCart } from 'src/app/ngRx/product.actions';
import { getCartItems } from 'src/app/ngRx/product.selector';
import { Observable } from 'rxjs';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  cartItems$: Observable<Product[]>;
  cartItems: Product[];
  addedToCart: Product[];
  faCheck = faCheck;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value: number = 50;
  isLoading: boolean = true;

  constructor(
    private product: ProductsService,
    private router: Router,
    private data: DataserviceService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.product.getAllProducts().subscribe(data => {
      // console.log('data: ', data)
      this.products = data;
      this.cartItems$ = this.store.select(getCartItems);
      this.cartItems$.subscribe(data => {
        this.cartItems = data;
        console.log(data);
        this.addedToCart = [];
        this.products.forEach(p => {
          if (this.cartItems.filter(f => f.id === p.id).length > 0) {
            p = { ...p, incart: true };
            this.addedToCart.push(p);
          } else {
            p = { ...p, incart: false };
            this.addedToCart.push(p);
          }
        });
        this.isLoading = false;
      });
    });
  }

  openProduct(product: Product) {
    console.log(product);
    this.router.navigateByUrl('/products/' + product.id);
    this.product.getSelectedProduct(product).subscribe(p => {
      console.log('data: ', p);
      // this.products = data
      this.data.openProductPage(p);
    });
  }

  addtoCart(product: any) {
    this.store.dispatch(addToCart({ product: product }));
  }
}
