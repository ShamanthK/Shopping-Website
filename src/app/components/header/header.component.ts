import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngRx/product.state';
import { productByCategory } from 'src/app/ngRx/product.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Product';
import { getCartItems, getLoginStatus } from 'src/app/ngRx/product.selector';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerOptions: Array<string> = []
  getItems$: Observable<Product[]>
  numCartItems: number = 0
  isAuthenticated$: Observable<boolean>

  constructor(private product: ProductsService, private store: Store<AppState>, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.headerOptions = ['home']
    this.product.getCategories().subscribe((data) => {
      data.forEach((c) => {
        this.headerOptions.push(c)
      })
      this.headerOptions.push('checkout')
    })
    this.getItems$ = this.store.select(getCartItems)
    this.getItems$.subscribe((data) => {
      this.numCartItems = data.length
    })
    this.isAuthenticated$ = this.store.select(getLoginStatus)
  }

  openByCategory(product: string) {
    this.isAuthenticated$.subscribe((login) => {
      if(login) {
        this.product.getProductByCategory(product).subscribe((data) => {
          this.store.dispatch(productByCategory({ product: data }))
          if (product === 'home') {
            this.router.navigateByUrl('/')
          } else if (product === 'checkout') {
            this.router.navigateByUrl('/checkout')
          } else {
            this.router.navigateByUrl('/category/' + product)
          }
        })
      } else {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '275px',
          // data: {name: this.name, animal: this.animal},
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
      }
    })

    
  }

}
