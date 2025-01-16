import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDemoComponent } from './recipe-demo.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeDemoRoutingModule { }
