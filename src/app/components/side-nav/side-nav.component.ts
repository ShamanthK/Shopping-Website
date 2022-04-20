import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { productByCategory } from 'src/app/ngRx/product.actions';
import { getCartItems, getLoginStatus } from 'src/app/ngRx/product.selector';
import { AppState } from 'src/app/ngRx/product.state';
import { Product } from 'src/app/Product';
import { ProductsService } from 'src/app/services/products.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  headerOptions: Array<string> = []
  getItems$: Observable<Product[]>
  numCartItems: number = 0
  isAuthenticated$: Observable<boolean>
  checkIndex: number

  constructor(private product: ProductsService, private store: Store<AppState>, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.headerOptions = ['home']
    this.product.getCategories().subscribe((data) => {
      data.forEach((c) => {
        this.headerOptions.push(c)
      })
    })
    this.getItems$ = this.store.select(getCartItems)
    this.getItems$.subscribe((data) => {
      this.numCartItems = data.length
    })
    this.isAuthenticated$ = this.store.select(getLoginStatus)
  }

  openByCategory(product: string, i: number) {
    this.isAuthenticated$.subscribe((login) => {
      if(login) {
        this.product.getProductByCategory(product).subscribe((data) => {
          this.store.dispatch(productByCategory({ product: data }))
          if (product === 'home') {
            this.router.navigate(['/'])
          } else if (product === 'checkout') {
            this.router.navigate(['/checkout'])
          } else {
            this.router.navigate(['/category/' + product])
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
    this.checkIndex = i
  }

}
