import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../../components/input/input.module';
import { ButtonModule } from '../../../../components/button/button.module';

import { SignupComponent } from './signup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;
  let authService: AuthService;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent, DefaultLoginComponent],
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
    fixture = TestBed.createComponent(SignupComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    toastr = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to signup', () => {
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation();

    component.redirectToLogin();

    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to dragons route if is logged', () => {
    const user = { email: 'test@test', password: '123' };
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation();
    const authServiceSpy = jest
      .spyOn(authService, 'createUser')
      .mockReturnValue();

    component.createAccount(user);

    expect(routerSpy).toHaveBeenCalledWith(['/dragons']);
    expect(authServiceSpy).toHaveBeenCalledWith(user);
  });

  it('should show toast if user is incorrect', () => {
    const user = { email: 'test@test', password: '321' };
    const toastSpy = jest.spyOn(toastr, 'error').mockImplementation();
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation();
    const authServiceSpy = jest
      .spyOn(authService, 'createUser')
      .mockImplementation(() => {
        throw new Error();
      });

    component.createAccount(user);

    expect(routerSpy).not.toHaveBeenCalled();
    expect(authServiceSpy).toHaveBeenCalledWith(user);
    expect(toastSpy).toHaveBeenCalledWith(
      'Já existe este email cadastrado!',
      'Problema ao criar conta!'
    );
  });
});
