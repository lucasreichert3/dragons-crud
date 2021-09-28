import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragonDetailComponent } from './pages/dragon-detail/dragon-detail.component';
import { DragonsListComponent } from './pages/dragons-list/dragons-list.component';
import { DragonsMainComponent } from './pages/dragons-main/dragons-main.component';

const routes: Routes = [
  {
    path: '',
    component: DragonsMainComponent,
    children: [
      { path: '', redirectTo: 'list' },
      { path: 'list', component: DragonsListComponent },
      { path: ':id', component: DragonDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DragonsRoutingModule {}
