import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/products');
  }

  getSelectedProduct(product: Product): Observable<Product[]> {
    const url = `/products/${product.id}`;
    return this.http.get<Product[]>(url);
  }

  getCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>('/products/categories');
  }

  getProductByCategory(product: any): Observable<any> {
    const url = `/products/category/${product}`;
    return this.http.get<Product[]>(url);
  }
}
