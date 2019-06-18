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
  selector: 'app-exercises-duration',
  templateUrl: './exercises-duration.component.html',
  styleUrls: ['./exercises-duration.component.css']
})
export class ExercisesDurationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedDate;
  public labelCollection = [];
  public sum: number;
  public duration;
  public exercise;
  public trainigData = <TrainingData>{
    chartData: [{
      data: [],
      label: ''
    }],
    chartLabels: this.labelCollection
  };
  public barChartColors = [
    {
      backgroundColor: ['#4B0082', '#1affff', '#6A5ACD', '#DDA0DD', '#F08080', '#800080', '#4B0082', '#7B68EE', '#BA55D3', '#DDA0DD'],
    },
  ];
  public barChartOptions = {
    title: {
      display: true,
      fontSize: 20,
      text: 'Duration of each exercise in minutes'
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
        const data = this.countDuration(filteredArray);
        this.trainigData.chartData = [
        {data: data, label: 'Duration'}
        ];
        filteredArray.map(el => {
          if (this.labelCollection.indexOf(el.name) === -1) {
            this.labelCollection.push((el.name));
          }
        });
        this.exercise = this.trainigData.chartLabels[0];
        this.duration =  Math.round(data[0]);
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
    const data = this.countDuration(filteredArray);
    this.trainigData.chartData = [
    {data: data, label: 'Duration'}
    ];
    this.exercise = this.trainigData.chartLabels[0];
    this.duration =  Math.round(data[0]);
  }


  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }

  private countDuration(data) {
   const countEx = [];
   const exNamesArray = [];
    _.forEach(data, (el) => {
      exNamesArray.push(el);
   });
   const exNames = this.labelCollection;
  _.forEach(exNames, (name) => {
    countEx.push(this.countSum(exNamesArray, name));
  });
   return countEx;
  }

  private countSum(array, name) {
    let sum = 0;
    _.forEach(array, (el) => {
      if (el.name === name) {
        sum += el.duration;
      }
    });
    return Math.round(sum * 100) / 100 ;
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
