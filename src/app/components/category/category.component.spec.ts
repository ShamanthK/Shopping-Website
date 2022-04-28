import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { Product } from 'src/app/Product';
import { CategoryComponent } from './category.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let productService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({ categoryProducts: productReducer }),
      ],
      declarations: [CategoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cart items', () => {
    const selectedProduct: Product[] = [
      {
        id: 1,
        description: 'Mens Clothes',
        category: 'clothing',
        image: '',
        price: 100,
        title: 'T-Shirt',
        rating: { user: 3 },
      },
    ];
    const category: string = 'clothing';
    const products: Product[] = [
      {
        id: 1,
        description: 'Mens Clothes',
        category: 'clothing',
        image: '',
        price: 100,
        title: 'T-Shirt',
        rating: { user: 3 },
      },
    ];
    component.cartItems = [
      {
        id: 1,
        description: 'Mens Clothes',
        category: 'clothing',
        image: '',
        price: 100,
        title: 'T-Shirt',
        rating: { user: 3 },
      },
    ];
    spyOn(productService, 'getProductByCategory').and.returnValue(of(products));
    component.productState$ = of(category);
    component.cartItems$ = of(selectedProduct);
    component.ngOnInit();
  });
});
