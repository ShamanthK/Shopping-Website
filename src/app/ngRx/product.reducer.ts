import { createReducer, on } from '@ngrx/store'
import { Product } from '../Product'
import { productByCategory, addToCart } from './product.actions'

export interface productState {
    products: Product[],
    cart: any
}

export const initialState: productState = {
    products: [],
    cart: []
}

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
)