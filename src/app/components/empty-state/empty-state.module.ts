import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';
import { LottieModule } from 'ngx-lottie';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [EmptyStateComponent],
  imports: [CommonModule, LottieModule, ButtonModule],
  exports: [EmptyStateComponent],
})
export class EmptyStateModule {}
