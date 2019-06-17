import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesPerExercisesComponent } from './calories-per-exercises.component';

describe('CaloriesPerExercisesComponent', () => {
  let component: CaloriesPerExercisesComponent;
  let fixture: ComponentFixture<CaloriesPerExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaloriesPerExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloriesPerExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
