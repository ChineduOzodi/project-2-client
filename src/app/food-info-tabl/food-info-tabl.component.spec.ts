
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoTablComponent } from './food-info-tabl.component';

describe('FoodInfoTablComponent', () => {
  let component: FoodInfoTablComponent;
  let fixture: ComponentFixture<FoodInfoTablComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodInfoTablComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodInfoTablComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
