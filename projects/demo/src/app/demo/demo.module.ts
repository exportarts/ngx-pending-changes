import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoViewOneComponent } from './views/demo-view-one/demo-view-one.component';
import { DemoViewTwoComponent } from './views/demo-view-two/demo-view-two.component';

@NgModule({
  declarations: [
    DemoViewOneComponent,
    DemoViewTwoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DemoModule { }
