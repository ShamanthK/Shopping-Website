import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { ProductsService } from 'src/app/services/products.service';
import { of } from 'rxjs/internal/observable/of';
import { Product } from '../../Product'

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({ categoryProducts: productReducer })
      ],
      declarations: [ ProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all products', () => {
    const products: Product[] = [{id: 1, description: 'Mens Clothes', category: 'clothing', image: '', price: 100, title: 'T-Shirt', rating: { user: 3 }}]
    spyOn(productService, 'getAllProducts').and.returnValue(of(products))
    component.ngOnInit()
  });    

  // it('should check cart items', () => {
  //   const products: Product[] = [{id: 1, description: 'Mens Clothes', category: 'clothing', image: '', price: 100, title: 'T-Shirt', rating: { user: 3 }}]
  //   component.cartItems$ = of([{id: 1, description: 'Mens Clothes', category: 'clothing', image: '', price: 100, title: 'T-Shirt', rating: { user: 3 }}])
  //   spyOn(productService, 'getAllProducts').and.returnValue(of(products))
  //   component.ngOnInit()
  // });

  it('should open selected product', () => {
    const product: Product = {id: 1, description: 'Mens Clothes', category: 'clothing', image: '', price: 100, title: 'T-Shirt', rating: { user: 3 }}
    const selectedProduct: Product[] = [{id: 1, description: 'Mens Clothes', category: 'clothing', image: '', price: 100, title: 'T-Shirt', rating: { user: 3 }}]
    spyOn(productService, 'getSelectedProduct').and.returnValue(of(selectedProduct))
    component.openProduct(product)
  });

  it('should add product to cart', () => {
    const selectedProduct: Product[] = [{id: 1, description: 'Mens Clothes', category: 'clothing', image: '', price: 100, title: 'T-Shirt', rating: { user: 3 }}]
    component.addtoCart(selectedProduct)
  });

});
