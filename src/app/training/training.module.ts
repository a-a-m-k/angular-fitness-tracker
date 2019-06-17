import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatFormField, MatDatepicker, MatDatepickerToggle} from '@angular/material';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { BurnedCaloriesComponent } from './burned-calories/burned-calories.component';
import { ChartsModule } from 'ng2-charts';
import { from } from 'rxjs/observable/from';
import { ExecisesStatisticComponent } from './execises-statistic/execises-statistic.component';
import { CaloriesPerExercisesComponent } from './calories-per-exercises/calories-per-exercises.component';
import { ExercisesDurationComponent } from './exercises-duration/exercises-duration.component';
import { ExerciseStateComponent } from './exercise-state/exercise-state.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    BurnedCaloriesComponent,
    DatePickerComponent,
    ExecisesStatisticComponent,
    CaloriesPerExercisesComponent,
    ExercisesDurationComponent,
    ExerciseStateComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    ChartsModule,
    NgbModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
