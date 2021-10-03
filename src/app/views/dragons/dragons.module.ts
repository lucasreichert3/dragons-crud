import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsListComponent } from './pages/dragons-list/dragons-list.component';
import { DragonDetailComponent } from './pages/dragon-detail/dragon-detail.component';
import { DragonsMainComponent } from './pages/dragons-main/dragons-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragonListItemModule } from './components/dragon-list-item/dragon-list-item.module';
import { DragonEditModalModule } from './components/dragon-edit-modal/dragon-edit-modal.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { EmptyStateModule } from 'src/app/components/empty-state/empty-state.module';

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
    DragonEditModalModule,
    ButtonModule,
    LoadingModule,
    EmptyStateModule
  ],
})
export class DragonsModule {}
