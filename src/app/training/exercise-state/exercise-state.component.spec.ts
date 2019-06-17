import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseStateComponent } from './exercise-state.component';

describe('ExerciseStateComponent', () => {
  let component: ExerciseStateComponent;
  let fixture: ComponentFixture<ExerciseStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
