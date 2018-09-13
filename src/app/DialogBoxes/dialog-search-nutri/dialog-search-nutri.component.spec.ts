import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchNutriComponent } from './dialog-search-nutri.component';

describe('DialogSearchNutriComponent', () => {
  let component: DialogSearchNutriComponent;
  let fixture: ComponentFixture<DialogSearchNutriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSearchNutriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchNutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
