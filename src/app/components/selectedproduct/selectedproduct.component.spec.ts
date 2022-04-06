import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedproductComponent } from './selectedproduct.component';

xdescribe('SelectedproductComponent', () => {
  let component: SelectedproductComponent;
  let fixture: ComponentFixture<SelectedproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check selected product', () => {
    // expect(component).toBeTruthy();
  });
});
