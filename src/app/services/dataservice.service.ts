import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  selectedProduct: Product[]
  private subject = new Subject<any>()

  constructor() { }

  openProductPage(product: Product[]) {
    this.selectedProduct = product
    this.subject.next(this.selectedProduct)
  }

  onSelectProduct(): Observable<any> {
    return this.subject.asObservable()
  }
}
