import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNavbarComponent } from './button-navbar.component';

describe('ButtonNavbarComponent', () => {
  let component: ButtonNavbarComponent;
  let fixture: ComponentFixture<ButtonNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
