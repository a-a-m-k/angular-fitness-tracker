import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";


import {MealComponent} from "./meal.component";

import {SharedModule} from "../shared/shared.module";


export const ROUTES: Routes = [
    {path: 'meal', component: MealComponent}
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    declarations: [

        MealComponent,
    ],
})

export class MealsModule {

}
