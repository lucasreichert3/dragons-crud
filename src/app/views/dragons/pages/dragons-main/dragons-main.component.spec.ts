import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieModule } from 'ngx-cookie';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AuthService } from '../../../auth/auth.service';

import { DragonsMainComponent } from './dragons-main.component';

describe('DragonsMainComponent', () => {
  let component: DragonsMainComponent;
  let fixture: ComponentFixture<DragonsMainComponent>;
  let authService: AuthService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragonsMainComponent],
      imports: [
        FontAwesomeModule,
        RouterTestingModule,
        CookieModule.forRoot(),
        NgxLocalStorageModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonsMainComponent);
    router = TestBed.inject(Router)
    authService = TestBed.inject(AuthService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const authSpy = jest.spyOn(authService, 'logout').mockImplementation()
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation()
    component.logout()

    expect(authSpy).toHaveBeenCalled()
    expect(routerSpy).toHaveBeenCalledWith(['/'])
  })
});
