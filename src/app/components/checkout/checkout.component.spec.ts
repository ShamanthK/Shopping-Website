import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CheckoutComponent } from './checkout.component';
import { By } from '@angular/platform-browser';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ categoryProducts: productReducer }),
        MatSnackBarModule
      ],
      declarations: [ CheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should update quantity value', () => {
    component.numCartItems = 3
    component.orderPlaced = false
    fixture.debugElement.query(By.css('mat-select')).triggerEventHandler('selectionChange', { value: 3 })
    expect(component.quantityValue).toEqual(3)
  });
});
