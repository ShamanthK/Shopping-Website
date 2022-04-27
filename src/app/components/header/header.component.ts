import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngRx/product.state';
import {
  loginUser,
  productByCategory,
  registerUser,
} from 'src/app/ngRx/product.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Product';
import {
  getCartItems,
  getLoggedIn,
  getLoginStatus,
} from 'src/app/ngRx/product.selector';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  headerOptions: Array<string> = [];
  getItems$: Observable<Product[]>;
  numCartItems: number = 0;
  isAuthenticated$: Observable<boolean>;
  checkIndex: number;
  getLoggedIn$: Observable<string | null>;
  getLoggedIn: string | null;

  constructor(
    private product: ProductsService,
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.headerOptions = ['home'];
    this.product.getCategories().subscribe(data => {
      data.forEach(c => {
        this.headerOptions.push(c);
      });
      this.headerOptions.push('checkout');
    });
    this.getItems$ = this.store.select(getCartItems);
    this.getItems$.subscribe(data => {
      this.numCartItems = data.length;
    });
    this.isAuthenticated$ = this.store.select(getLoginStatus);
    this.getLoggedIn$ = this.store.select(getLoggedIn);
    this.getLoggedIn$.subscribe(login => {
      console.log('getLog: ', login);
      this.getLoggedIn = login;
    });
  }

  openByCategory(product: string, i: number) {
    this.isAuthenticated$.subscribe(login => {
      console.log('logged: ', localStorage.getItem('loggedIn'), login);
      if (login || localStorage.getItem('loggedIn') === 'Yes') {
        if (product === 'home') {
          this.router.navigate(['/']);
        } else if (product === 'checkout') {
          this.router.navigate(['/checkout']);
        } else {
          this.router.navigate(['/category/' + product]);
          this.store.dispatch(productByCategory({ product: product }));
        }
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
    });
    this.checkIndex = i;
  }

  logOut() {
    if (localStorage.getItem('loggedIn') === 'Yes') {
      localStorage.setItem('loggedIn', 'No');
      setTimeout(() => {
        this.store.dispatch(
          loginUser({ login: localStorage.getItem('loggedIn') })
        );
      }, 1000);
      this.store.dispatch(registerUser());
      this.router.navigate(['/']);
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
  }
}
