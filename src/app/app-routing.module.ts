import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditRestaurantComponent } from './add-edit-restaurant/add-edit-restaurant.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ':id', component: AddEditRestaurantComponent },
  { path: ':id/:restaurantId', component: AddEditRestaurantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
