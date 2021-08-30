import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingChangesGuard } from 'ngx-pending-changes';
import { DemoViewOneComponent } from './views/demo-view-one/demo-view-one.component';
import { DemoViewTwoComponent } from './views/demo-view-two/demo-view-two.component';

const routes: Routes = [
  {
    path: 'one',
    component: DemoViewOneComponent,
    canDeactivate: [
      PendingChangesGuard
    ]
  },
  {
    path: 'two',
    component: DemoViewTwoComponent,
    canDeactivate: [
      PendingChangesGuard
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'one'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
