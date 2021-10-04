import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AuthService } from '../views/auth/auth.service';
import { CanLoadDragons } from './security.guard';

describe('DragonsService', () => {
  let service: CanLoadDragons;
  let authService: AuthService;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CookieModule.forRoot(),
        NgxLocalStorageModule.forRoot(),
        RouterTestingModule,
      ],
    });
    service = TestBed.inject(CanLoadDragons);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sould return true when user is logged', () => {
    const authSpy = jest
      .spyOn(authService, 'getCurrentUser')
      .mockReturnValue({ email: 'test', password: 'test' });

    expect(service.canLoad()).toBeTruthy();
    expect(authSpy).toHaveBeenCalled();
  });

  it('sould return false when user is not logged', () => {
    const authSpy = jest
      .spyOn(authService, 'getCurrentUser')
      .mockReturnValue(undefined);
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation()

    expect(service.canLoad()).toBeFalsy();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/login'])
  });
});
