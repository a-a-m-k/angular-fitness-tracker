import { Component, OnInit, Input } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})

export class DatePickerComponent {
  @Input() isStatisticShown;
  @Input() isBurnedCaloriesShown;
  public selectedDate: Date = new Date();

  public onDate(event): void {
  this.selectedDate = event;
  }
}
