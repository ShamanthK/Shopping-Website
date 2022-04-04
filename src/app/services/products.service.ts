import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'https://fakestoreapi.com/products'
  private categoriesUrl = 'https://fakestoreapi.com/products/categories'
  private productCategoryUrl = 'https://fakestoreapi.com/products/category'

  constructor(private http: HttpClient) { 
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
  }

  getSelectedProduct(product: Product): Observable<Product[]> {
    const url = `${this.productsUrl}/${product.id}`
    return this.http.get<Product[]>(url)
  }

  getCategories():Observable<Array<string>> {
    return this.http.get<Array<string>>(this.categoriesUrl)
  }

  getProductByCategory(product: any):Observable<any> {
    const url = `${this.productCategoryUrl}/${product}`
    return this.http.get<Product[]>(url)
  }
}
