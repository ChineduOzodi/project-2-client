
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoTableComponent } from './food-info-table.component';

describe('FoodInfoTableComponent', () => {
  let component: FoodInfoTableComponent;
  let fixture: ComponentFixture<FoodInfoTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodInfoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
