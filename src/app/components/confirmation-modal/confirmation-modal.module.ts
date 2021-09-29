import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { ButtonModule } from '../button/button.module';



@NgModule({
  declarations: [
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  entryComponents: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent]
})
export class ConfirmationModalModule { }
