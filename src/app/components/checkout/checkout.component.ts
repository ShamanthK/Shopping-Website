import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { productState } from 'src/app/ngRx/product.reducer';
import { getCartItems } from 'src/app/ngRx/product.selector';
import { AppState } from 'src/app/ngRx/product.state';
import { Product } from 'src/app/Product';
import { faXmark, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessOrderComponent } from '../success-order/success-order.component';
import { removeFromCart } from 'src/app/ngRx/product.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems$: Observable<Product[]>
  quantity: any = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
  ]
  quantityValue: number = 1
  totalPrice: number = 0
  tax: number = 0
  faXmark = faXmark
  faCartShopping = faCartShopping
  numCartItems: number = 0
  orderPlaced: boolean = false

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartItems$ = this.store.select(getCartItems)
    this.cartItems$.subscribe((data) => {
      console.log(data)
      this.numCartItems = data.length
      data.forEach((p) => {
        this.totalPrice = this.totalPrice + p.price
      })
      this.tax = parseInt((this.totalPrice * 0.1).toFixed(2))
    })
  }

  selectedQuantity(e: MatSelectChange) {
    this.quantityValue = parseInt(e.value)
    console.log(e)
  }

  placeOrder() {
    this._snackBar.openFromComponent(SuccessOrderComponent, {
      duration: 100 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
    this.orderPlaced = true
  }

  removeCartItem(item: Product) {
    console.log('remove')
    this.store.dispatch(removeFromCart({ product: item }))
  }

}
