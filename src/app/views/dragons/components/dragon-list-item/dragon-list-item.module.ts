import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonListItemComponent } from './dragon-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DragonListItemComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [DragonListItemComponent],
})
export class DragonListItemModule {}
