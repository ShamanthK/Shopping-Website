import { createReducer, on } from '@ngrx/store';
import { Product } from '../Product';
import {
  productByCategory,
  addToCart,
  removeFromCart,
  registerUser,
} from './product.actions';

export interface productState {
  products: Product[];
  cart: any;
  login: boolean;
}

export const initialState: productState = {
  products: [],
  cart: [],
  login: false,
};

export const productReducer = createReducer(
  initialState,
  on(productByCategory, (state, { product }) => ({
    ...state,
    products: product,
  })),
  on(addToCart, (state, { product }) => ({
    ...state,
    cart: [...state.cart, product],
  })),
  on(removeFromCart, (state, { product }) => ({
    ...state,
    cart: state.cart.filter((c: Product) => c.id !== product.id),
  })),
  on(registerUser, (state) => ({
    ...state,
    login: !state.login,
  }))
);
