import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonFormComponent } from './dragon-form.component';
import { InputModule } from 'src/app/components/input/input.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DragonFormComponent],
  imports: [CommonModule, InputModule, ButtonModule, ReactiveFormsModule],
  exports: [DragonFormComponent],
})
export class DragonFormModule {}
