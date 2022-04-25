import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCart } from 'src/app/ngRx/product.actions';
import { getProductList } from 'src/app/ngRx/product.selector';
import { AppState } from 'src/app/ngRx/product.state';
import { Product } from 'src/app/Product';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  productList$: Observable<Product[]>;
  faCheck = faCheck;
  @Input() type: string;

  constructor(
    private store: Store<AppState>,
    private product: ProductsService,
    private router: Router,
    private data: DataserviceService
  ) {}

  ngOnInit(): void {
    this.productList$ = this.store.select(getProductList);
  }

  addtoCart(product: any) {
    this.store.dispatch(addToCart({ product: product }));
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
}
