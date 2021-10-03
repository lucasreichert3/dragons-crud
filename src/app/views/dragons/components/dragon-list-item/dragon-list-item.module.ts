import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonListItemComponent } from './dragon-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationModalModule } from 'src/app/components/confirmation-modal/confirmation-modal.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';

@NgModule({
  declarations: [DragonListItemComponent],
  imports: [CommonModule, FontAwesomeModule, ConfirmationModalModule, LoadingModule],
  exports: [DragonListItemComponent],
})
export class DragonListItemModule {}
