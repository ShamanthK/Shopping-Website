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

  constructor(
    private store: Store<AppState>,
    private dataService: DataserviceService
  ) {
    // this.isAuthenticated$ = this.store.select(getLoginStatus)
    this.subscription = this.dataService.onAuthentication().subscribe(value => {
      console.log('value:', value);
      this.isAuthenticated = value;
    });
  }

  isAuthenticatedUser() {
    console.log('this.isAuthenticated: ', this.isAuthenticated);
    return this.isAuthenticated;
  }
}
