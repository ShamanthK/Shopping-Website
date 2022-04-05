import { createSelector, createFeatureSelector } from "@ngrx/store";
import { productState } from "./product.reducer";

export const appCount = createFeatureSelector<productState>('categoryProducts')

export const getCategoryProducts = createSelector(appCount, (state: productState) => { return state.products })

export const getCartItems = createSelector(appCount, (state: productState) => { return state.cart })

export const getLoginStatus = createSelector(appCount, (state: productState) => { return state.login })


