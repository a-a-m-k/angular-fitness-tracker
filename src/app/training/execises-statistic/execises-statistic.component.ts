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
  selector: 'app-execises-statistic',
  templateUrl: './execises-statistic.component.html',
  styleUrls: ['./execises-statistic.component.css']
})
export class ExecisesStatisticComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedDate;
  public labelCollection = [];
  public sum: number;
  public trainigData = <TrainingData>{
    chartData: [{
      data: [],
      label: ''
    }],
    chartLabels: this.labelCollection
  };
  public pieChartColors = [
    {
      backgroundColor: ['#FF00FF', '#FF1493', '#C71585', '#DB7093', '#F08080', '#800080', '#4B0082', '#7B68EE', '#BA55D3', '#DDA0DD'],
    },
  ];
  public pieChartOptions = {
      title: {
        display: true,
        fontSize: 20,
        text: 'Amount of repetitions'
      }
    };
  private exChangedSubscription: Subscription;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private trainingService: TrainingService, private elementRef: ElementRef ) { }

  ngOnInit() {
    this.trainigData.data = Array<Exercise>();
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.trainigData.data = exercises;
        const filteredArray = this.filterDate( this.trainigData.data, this.selectedDate);
        const data = this.divideIntoExercises(filteredArray);
        this.trainigData.chartData = [
        {data: data, label: 'Calories'}
        ];
        filteredArray.map(el => {
          if (this.labelCollection.indexOf(el.name) === -1) {
            this.labelCollection.push((el.name));
          }
        });
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnChanges(changes: SimpleChanges) {
    _.remove(this.labelCollection);
    const name: SimpleChange = changes.selectedDate;
    this.selectedDate = name.currentValue || new Date();
    const filteredArray = this.filterDate( this.trainigData.data, this.selectedDate);
    filteredArray.map(el => {
      if (this.labelCollection.indexOf(el.name) === -1) {
        this.labelCollection.push((el.name));
      }
    });
    const data = this.divideIntoExercises(filteredArray);
    this.trainigData.chartData = [
    {data: data, label: 'Calories'}
    ];
  }


  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }

  private divideIntoExercises(data) {
   const countEx = [];
   const exNamesArray = [];
    _.forEach(data, (el) => {
      exNamesArray.push(el.name);
   });
   const exNames = this.labelCollection;
  _.forEach(exNames, (name) => {
    countEx.push(this.sortEx(exNamesArray, name));
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
