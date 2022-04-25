import { createReducer, on } from '@ngrx/store';
import { Product } from '../Product';
import {
  productByCategory,
  addToCart,
  removeFromCart,
  registerUser,
  sendProducts,
} from './product.actions';

export interface productState {
  products: string;
  cart: any;
  login: boolean;
  productList: Product[];
}

export const initialState: productState = {
  products: '',
  cart: [],
  login: false,
  productList: [],
};

export const productReducer = createReducer(
  initialState,
  on(productByCategory, (state, { product }) => ({
    ...state,
    products: product,
  })),
  on(sendProducts, (state, { product }) => ({
    ...state,
    productList: product,
  })),
  on(addToCart, (state, { product }) => ({
    ...state,
    cart: [...state.cart, product],
  })),
  on(removeFromCart, (state, { product }) => ({
    ...state,
    cart: state.cart.filter((c: Product) => c.id !== product.id),
  })),
  on(registerUser, state => ({
    ...state,
    login: !state.login,
  }))
);
