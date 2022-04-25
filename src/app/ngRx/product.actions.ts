import { createAction, props } from '@ngrx/store';
import { Product } from '../Product';

export const productByCategory = createAction(
  '[Category Component] Category',
  props<{ product: string }>()
);

export const addToCart = createAction(
  '[Product Component] Cart',
  props<{ product: Product[] }>()
);

export const removeFromCart = createAction(
  '[Checkout Component] Cart',
  props<{ product: Product }>()
);

export const sendProducts = createAction(
  '[Category Component] Cart',
  props<{ product: Product[] }>()
);

export const registerUser = createAction('[Login Component] Register');
