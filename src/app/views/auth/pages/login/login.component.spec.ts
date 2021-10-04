import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../../components/input/input.module';
import { ButtonModule } from '../../../../components/button/button.module';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;
  let toastr: ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, DefaultLoginComponent],
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputModule,
        RouterTestingModule,
        CookieModule.forRoot(),
        NgxLocalStorageModule.forRoot(),
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    toastr = TestBed.inject(ToastrService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to signup', () => {
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation();

    component.redirectToSignup();

    expect(routerSpy).toHaveBeenCalledWith(['/signup']);
  });

  it('should redirect to dragons route if is logged', () => {
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation();
    const authServiceSpy = jest.spyOn(authService, 'login').mockReturnValue();

    component.login({ email: 'test@test', password: '123' });

    expect(routerSpy).toHaveBeenCalledWith(['/dragons']);
    expect(authServiceSpy).toHaveBeenCalled();
  });

  it('should show toast if user is incorrect', () => {
    const toastSpy = jest.spyOn(toastr, 'error').mockImplementation()
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation();
    const authServiceSpy = jest
      .spyOn(authService, 'login')
      .mockImplementation(() => {
        throw new Error();
      });

    component.login({ email: 'test@test', password: '123' });

    expect(routerSpy).not.toHaveBeenCalled()
    expect(authServiceSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalledWith('Usuário ou senha incorreto')
  });
});
