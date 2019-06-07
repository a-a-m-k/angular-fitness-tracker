import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';


import { UIService } from '../shared/ui.service';
import { firestore } from 'firebase/app';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<any>();
  exercisesChanged = new Subject<any[]>();
  finishedExercisesChanged = new Subject<any[]>();
  private availableExercises: any[] = [];
  private runningExercise: any;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories
          };
        });
      })
      .subscribe((exercises: any[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
        this.exercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  fetchExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  getExercisesPerDay(date: string) {
    const todayDate = new Date(date) // Any date in string
    const spendsRef = this.db.collection('finishedExercises', ref => ref.where("date", "==", todayDate));
    const arr = spendsRef.valueChanges();
    return arr;
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: any) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
