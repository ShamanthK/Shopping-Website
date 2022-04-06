import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { productReducer } from 'src/app/ngRx/product.reducer';
import { ExplorepageComponent } from './explorepage.component';

describe('ExplorepageComponent', () => {
  let component: ExplorepageComponent;
  let fixture: ComponentFixture<ExplorepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [
      MatDialogModule,
      StoreModule.forRoot({ categoryProducts: productReducer })
    ],
      declarations: [ ExplorepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
