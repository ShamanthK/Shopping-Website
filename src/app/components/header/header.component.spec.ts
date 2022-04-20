import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let productService: ProductsService;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ categoryProducts: productReducer }),
        RouterTestingModule,
        MatDialogModule,
      ],
      declarations: [HeaderComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for checkIndex', () => {
    component.openByCategory('', 3);
    expect(component.checkIndex).toEqual(3);
  });

  it('should check for get category', () => {
    const categories: Array<string> = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing",
    ];
    spyOn(productService, 'getCategories').and.returnValue(of(categories));
    component.ngOnInit();
    expect(component.headerOptions).toEqual([
      'home',
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing",
      'checkout',
    ]);
  });

  it('should check for login true path /category/product', () => {
    component.isAuthenticated$ = of(true);
    productService.getProductByCategory('electronics');
    spyOn(productService, 'getProductByCategory').and.returnValue(
      of('electronics')
    );
    component.openByCategory('electronics', 3);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/category/electronics']);
  });

  it('should check for login true path /', () => {
    component.isAuthenticated$ = of(true);
    productService.getProductByCategory('home');
    spyOn(productService, 'getProductByCategory').and.returnValue(of('home'));
    component.openByCategory('home', 3);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should check for login true path /checkout', () => {
    component.isAuthenticated$ = of(true);
    productService.getProductByCategory('checkout');
    spyOn(productService, 'getProductByCategory').and.returnValue(
      of('checkout')
    );
    component.openByCategory('checkout', 3);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/checkout']);
  });
});
