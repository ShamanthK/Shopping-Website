import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  selectedProduct: Product[]
  private subject = new Subject<any>()
  private subject1 = new Subject<any>()
  isLoggedIn: boolean = false

  constructor() { }

  openProductPage(product: Product[]) {
    this.selectedProduct = product
    this.subject.next(this.selectedProduct)
  }

  onSelectProduct(): Observable<any> {
    return this.subject.asObservable()
  }

  authenticateUser(): void {
    console.log('entered')
    this.isLoggedIn = !this.isLoggedIn
    this.subject1.next(this.isLoggedIn)
  }

  onAuthentication(): Observable<any> {
    return this.subject1.asObservable()
  }
}
