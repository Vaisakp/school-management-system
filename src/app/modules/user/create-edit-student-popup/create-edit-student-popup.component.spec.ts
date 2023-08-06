import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditStudentPopupComponent } from './create-edit-student-popup.component';

describe('CreateEditStudentPopupComponent', () => {
  let component: CreateEditStudentPopupComponent;
  let fixture: ComponentFixture<CreateEditStudentPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditStudentPopupComponent]
    });
    fixture = TestBed.createComponent(CreateEditStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
