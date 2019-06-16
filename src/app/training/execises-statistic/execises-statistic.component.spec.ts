import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecisesStatisticComponent } from './execises-statistic.component';

describe('ExecisesStatisticComponent', () => {
  let component: ExecisesStatisticComponent;
  let fixture: ComponentFixture<ExecisesStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecisesStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecisesStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
