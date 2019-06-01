import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';
import {Chart} from 'chart.js';
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy, ElementRef  } from '@angular/core';
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
export class BurnedCaloriesComponent implements OnInit, OnDestroy, OnChanges{
  @Input() selectedDate;

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
        this.trainigData.data =  exercises;  
        const filteredArray = this.filterDate(exercises, this.selectedDate);
        this.getChartData(filteredArray);   
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises(); 
  }
  
  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.selectedDate;
    this.selectedDate = name.currentValue || new Date();
    const filteredArray = this.filterDate( this.trainigData.data, this.selectedDate);      
    this.getChartData(filteredArray);  
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
  
  private getChartData(trainigData){
    const dates = [];
    const calories = [];
    const sortedTrainingData = this.sortDate(trainigData)
     _.forEach(sortedTrainingData,(elem)=>{
       const elData = _.get(elem, 'date');
       const elCalories = _.get(elem, 'calories');
        dates.push(elData);
        calories.push(elCalories);
     });
    const formatedDate = this.formatDate(dates, 'hh:mm A');
    this.trainigData.chartLabels = formatedDate;
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
  
  private sortDate(dateArray){
    const sortedArray = dateArray.sort((a, b) => {
      var dateA: any = moment(a.date), dateB:any = moment(b.date);
      return dateA - dateB;
  });
    return sortedArray;
  }

  private filterDate(dateArray, date){
     let filteredArray = [];
     const selectedDate = moment(date).format('MMMM DD YYYY');
     _.forEach(dateArray, (dateEl) => {
       const formatedDateEl =  moment(dateEl.date).format('MMMM DD YYYY');
       if(selectedDate === formatedDateEl){
         filteredArray.push(dateEl);
        }
     });
     return filteredArray;
  }
}