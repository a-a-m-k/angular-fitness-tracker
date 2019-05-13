import { Exercise } from './exercise.model';
export interface TrainingData {
    data: Array<Exercise>;
    chartOptions: {
     responsive: true
    };
    chartData:[{
        data: Number[],
        label:string
    
    }];
    chartLabels: Date[] | String[];

}
