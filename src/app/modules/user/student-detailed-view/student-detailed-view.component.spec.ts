import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailedViewComponent } from './student-detailed-view.component';

describe('StudentDetailedViewComponent', () => {
  let component: StudentDetailedViewComponent;
  let fixture: ComponentFixture<StudentDetailedViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDetailedViewComponent]
    });
    fixture = TestBed.createComponent(StudentDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
