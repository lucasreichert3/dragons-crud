import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AuthService } from '../views/auth/auth.service';
import { SessionResolver } from './session.resolver';

describe('DragonsService', () => {
  let service: SessionResolver;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CookieModule.forRoot(),
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule,
      ],
    });
    service = TestBed.inject(SessionResolver);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to dragons route when user is logged', () => {
    const loggedUser = { email: 'test', password: 'test' }
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation()
    const authSpy = jest
      .spyOn(authService, 'getCurrentUser')
      .mockReturnValue(loggedUser);

    expect(service.resolve()).toEqual(loggedUser);
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/dragons'])
  })

  it('should not redirect to dragons route when user is not logged', () => {
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation()
    const authSpy = jest
      .spyOn(authService, 'getCurrentUser')
      .mockReturnValue(undefined);

    expect(service.resolve()).toEqual(undefined);
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled()
  })
});
