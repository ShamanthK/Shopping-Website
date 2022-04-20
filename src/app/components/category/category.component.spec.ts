import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { Product } from 'src/app/Product';
import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ categoryProducts: productReducer }),
      ],
      declarations: [CategoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart', () => {
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
    component.addtoCart(selectedProduct);
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
    component.productState$ = of(selectedProduct);
    component.cartItems$ = of(selectedProduct);
    component.ngOnInit();
  });
});
