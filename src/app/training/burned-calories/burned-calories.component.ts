import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';
import {Chart} from 'chart.js';
import { Component, OnInit, OnDestroy, ElementRef  } from '@angular/core';
import { MatTableDataSource} from '@angular/material';

import { Exercise } from '../exercise.model';
import {TrainingData} from '../training-data.model';
import { TrainingService } from '../training.service';
import { from } from 'rxjs/observable/from';


@Component({
  selector: 'app-burned-calories',
  templateUrl: './burned-calories.component.html',
  styleUrls: ['./burned-calories.component.css']
})
export class BurnedCaloriesComponent implements OnInit, OnDestroy{
  private trainigData = <TrainingData>{
    chartData:[{
      data: [],
      label:''
  
  }]
  };
  private exChangedSubscription: Subscription;
  constructor(private trainingService: TrainingService, private elementRef: ElementRef ) { }

  ngOnInit() {
    this.trainigData.data = Array<Exercise>();
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.trainigData.data = exercises;
        this.getChartData(exercises)
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises(); 
  }
  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
  
  private getChartData(trainigData){
    const dates = [];
    const calories = [];
     _.forEach(trainigData,(elem)=>{
       const elData = _.get(elem, 'date');
       const elCalories = _.get(elem, 'calories');
        dates.push(elData);
        calories.push(elCalories);
     });

     this.trainigData.chartLabels = this.formatDate(dates, 'MMMM DD YYYY, h:mm:ss');
     this.trainigData.chartData = [
      { data: calories, label: 'Calories' }
    ];
  }

  private formatDate(dateArray, format){
    const formatedDate = _.map(dateArray, (date) => {
        return moment(date).format(format);
    });
    return formatedDate;
    
  }
}