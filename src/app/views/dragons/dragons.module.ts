import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsListComponent } from './pages/dragons-list/dragons-list.component';
import { DragonDetailComponent } from './pages/dragon-detail/dragon-detail.component';
import { DragonsMainComponent } from './pages/dragons-main/dragons-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DragonsListComponent,
    DragonDetailComponent,
    DragonsMainComponent
  ],
  imports: [CommonModule, DragonsRoutingModule, FontAwesomeModule],
})
export class DragonsModule {}
