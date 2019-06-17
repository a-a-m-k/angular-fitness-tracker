import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesDurationComponent } from './exercises-duration.component';

describe('ExercisesDurationComponent', () => {
  let component: ExercisesDurationComponent;
  let fixture: ComponentFixture<ExercisesDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
