import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsListComponent } from './pages/dragons-list/dragons-list.component';
import { DragonDetailComponent } from './pages/dragon-detail/dragon-detail.component';
import { DragonsMainComponent } from './pages/dragons-main/dragons-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragonListItemModule } from './components/dragon-list-item/dragon-list-item.module';

@NgModule({
  declarations: [
    DragonsListComponent,
    DragonDetailComponent,
    DragonsMainComponent,
  ],
  imports: [
    CommonModule,
    DragonsRoutingModule,
    FontAwesomeModule,
    DragonListItemModule,
  ],
})
export class DragonsModule {}
