import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserInfoComponent } from './dialog-edit-user-info.component';

describe('DialogEditUserInfoComponent', () => {
  let component: DialogEditUserInfoComponent;
  let fixture: ComponentFixture<DialogEditUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
