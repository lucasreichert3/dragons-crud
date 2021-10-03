import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonFormComponent } from './dragon-form.component';
import { InputModule } from 'src/app/components/input/input.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'src/app/components/loading/loading.module';

@NgModule({
  declarations: [DragonFormComponent],
  imports: [
    CommonModule,
    InputModule,
    ButtonModule,
    ReactiveFormsModule,
    LoadingModule,
  ],
  exports: [DragonFormComponent],
})
export class DragonFormModule {}
