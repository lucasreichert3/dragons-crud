import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonEditModalComponent } from './dragon-edit-modal.component';
import { ButtonModule } from '../../../../components/button/button.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragonFormModule } from '../dragon-form/dragon-form.module';

@NgModule({
  declarations: [DragonEditModalComponent],
  imports: [CommonModule, ButtonModule, FontAwesomeModule, DragonFormModule],
  exports: [DragonEditModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DragonEditModalModule {}
