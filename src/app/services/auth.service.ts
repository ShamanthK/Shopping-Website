import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getLoginStatus } from '../ngRx/product.selector';
import { AppState } from '../ngRx/product.state';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean;
  subscription: Subscription;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private dataService: DataserviceService
  ) {
    this.isAuthenticated$ = this.store.select(getLoginStatus);
  }

  isAuthenticatedUser() {
    // this.isAuthenticated$.subscribe(login => {
    //   console.log('auth:', login);
    // });
    const isLoggedIn = localStorage.getItem('loggedIn');
    console.log(isLoggedIn);
    return isLoggedIn;
  }
}
