import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddToCatergoryComponent } from './dialog-add-to-catergory.component';

describe('DialogAddToCatergoryComponent', () => {
  let component: DialogAddToCatergoryComponent;
  let fixture: ComponentFixture<DialogAddToCatergoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddToCatergoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddToCatergoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
