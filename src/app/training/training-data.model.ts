import { Exercise } from './exercise.model';
export interface TrainingData {
    data: Array<Exercise>;
    chartOptions: {
     responsive: true
    };
    chartData:[{
        data: string[] | Number[],
        label:string
    
    }];
    chartLabels: Date[] | any[];

}
