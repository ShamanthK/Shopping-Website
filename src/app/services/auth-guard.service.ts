import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    console.log(
      'this.auth.isAuthenticatedUser(); ',
      this.auth.isAuthenticatedUser()
    );
    if (this.auth.isAuthenticatedUser() === 'No') {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
