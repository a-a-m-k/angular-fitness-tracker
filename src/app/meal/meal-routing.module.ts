import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealComponent } from './meal.component';

const routes: Routes = [
  { path: 'meal', component: MealComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealRoutingModule {}
