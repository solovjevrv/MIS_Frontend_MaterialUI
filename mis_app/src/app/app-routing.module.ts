import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsList } from './patients-list/patients-list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: PatientsList, pathMatch: 'full' },

  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
