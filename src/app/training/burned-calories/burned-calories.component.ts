import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material';

import { BaseChartDirective } from 'ng2-charts';

import { Exercise } from '../exercise.model';
import {TrainingData} from '../training-data.model';
import { TrainingService } from '../training.service';
import { from } from 'rxjs/observable/from';


@Component({
  selector: 'app-burned-calories',
  templateUrl: './burned-calories.component.html',
  styleUrls: ['./burned-calories.component.css']
})
export class BurnedCaloriesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedDate;
  private labelCollection = [];
  public sum: number;
  public trainigData = <TrainingData>{
    chartData: [{
      data: [],
      label: ''
    }],
    chartLabels: this.labelCollection
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
        _.remove(this.labelCollection);
        this.trainigData.chartData = [
        {data: filteredArray.map(el => el.calories), label: 'Calories'}
        ];
        filteredArray.map(el => {
          this.labelCollection.push(this.formatDate(el.date, 'hh:mm A'));
        });
        this.getCaloriesSum(filteredArray);
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngOnChanges(changes: SimpleChanges) {
    _.remove(this.labelCollection);
    const name: SimpleChange = changes.selectedDate;
    this.selectedDate = name.currentValue || new Date();
    const filteredArray = this.filterDate( this.trainigData.data, this.selectedDate);
    this.trainigData.chartData = [
      {data: filteredArray.map(el => el.calories), label: 'Calories'}
    ];
    filteredArray.map(el => {
     this.labelCollection.push(this.formatDate(el.date, 'hh:mm A'));
    });
    this.getCaloriesSum(filteredArray);
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }

  private getCaloriesSum(trainigData) {
    const calories = [];
     _.forEach(trainigData, (elem) => {
       const elCalories = _.get(elem, 'calories');
       calories.push(elCalories);
     });
     this.sum =  Math.round(_.sum(calories));
  }

  private formatDate(date, format) {
    const dateEl = date;
    return moment(dateEl).format(format);
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
