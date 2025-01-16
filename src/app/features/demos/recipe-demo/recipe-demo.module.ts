import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeDemoComponent } from './recipe-demo.component';
import { RecipeDemoRoutingModule } from './recipe-demo-routing.module';

@NgModule({
  declarations: [RecipeDemoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RecipeDemoRoutingModule
  ]
})
export class RecipeDemoModule { }
