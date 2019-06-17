import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { Exercise } from '../exercise.model';
import {TrainingData} from '../training-data.model';
import { TrainingService } from '../training.service';

import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-exercise-state',
  templateUrl: './exercise-state.component.html',
  styleUrls: ['./exercise-state.component.css']
})
export class ExerciseStateComponent implements OnInit, OnChanges, OnDestroy {

  @Input() selectedDate;
  public labelCollection =  ['completed', 'cancelled'];
  public sum: number;
  public trainigData = <TrainingData>{
    chartData: [{
      data: [],
      label: ''
    }],
    chartLabels: this.labelCollection
  };
  public doughnutChartColors = [
    {
      backgroundColor: ['#90EE90', '#CD5C5C'],
    },
  ];
  private exChangedSubscription: Subscription;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private trainingService: TrainingService, private elementRef: ElementRef ) { }

  ngOnInit() {
    this.trainigData.data = Array<Exercise>();
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.trainigData.data = exercises;
        const filteredArray = this.filterDate( this.trainigData.data, this.selectedDate);
        const data = this.checkState(filteredArray);
        this.trainigData.chartData = [
        {data: data, label: 'State'}
        ];
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.selectedDate;
    this.selectedDate = name.currentValue || new Date();
    const filteredArray = this.filterDate( this.trainigData.data, this.selectedDate);
    const data = this.checkState(filteredArray);
    this.trainigData.chartData = [
    {data: data, label: 'State'}
    ];
  }


  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }

  private checkState(data) {
   const countEx = [];
   const exNames = this.labelCollection;
   const stateArray = _.map(data, (el: any) => el.state);
  _.forEach(exNames, (name) => {
    countEx.push(this.sortEx(stateArray, name));
  });
   return countEx;
  }

  private sortEx(array, name) {
    return _.countBy(array)[name];
  }
  private filterDate(dateArray, date) {
    const filteredArray = [];
    const selectedDate = moment(date).format('MMMM DD YYYY');
    _.forEach(dateArray, (dateEl) => {
      const formatedDateEl =  moment(dateEl.date).format('MMMM DD YYYY');
      if (selectedDate === formatedDateEl) {
        filteredArray.push(dateEl);
       }
    });
    return filteredArray;
 }

}
