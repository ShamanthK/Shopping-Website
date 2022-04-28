import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/Product';
import { ProductsService } from 'src/app/services/products.service';
import { of } from 'rxjs/internal/observable/of';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let productService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({ categoryProducts: productReducer }),
      ],
      declarations: [ProductCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
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

  it('should open selected product', () => {
    const product: Product = {
      id: 1,
      description: 'Mens Clothes',
      category: 'clothing',
      image: '',
      price: 100,
      title: 'T-Shirt',
      rating: { user: 3 },
    };
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
    spyOn(productService, 'getSelectedProduct').and.returnValue(
      of(selectedProduct)
    );
    component.openProduct(product);
  });
});
