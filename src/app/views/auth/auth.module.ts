import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginMainComponent } from './pages/login-main/login-main.component';
import { InputModule } from '../../components/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/components/button/button.module';
import { DefaultLoginComponent } from './components/default-login/default-login.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, LoginMainComponent, DefaultLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class AuthModule {}
