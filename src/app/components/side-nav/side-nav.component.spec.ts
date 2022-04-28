import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let dialog: MatDialog;
  let productService: ProductsService;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({ categoryProducts: productReducer }),
        MatDialogModule,
      ],
      declarations: [SideNavComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    productService = TestBed.inject(ProductsService);
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
