import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '../../../../components/button/button.module';
import { InputModule } from '../../../../components/input/input.module';

import { DefaultLoginComponent } from './default-login.component';

describe('DefaultLoginComponent', () => {
  let component: DefaultLoginComponent;
  let fixture: ComponentFixture<DefaultLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultLoginComponent],
      imports: [
        InputModule,
        ButtonModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
      const spy = jest.spyOn(component, 'initForm').mockImplementation()

      component.ngOnInit()

      expect(spy).toHaveBeenCalled()
  });

  it('should emit event if form is valid', () => {
    const eventSpy = jest.spyOn(component.buttonClick, 'emit').mockImplementation()
    const form = { email: 'test@teste', password: '123' }
    component.loginForm.patchValue(form)

    component.handleButtonClick()

    expect(eventSpy).toHaveBeenCalledWith(form)
  })

  it('should not emit event if form is invalid', () => {
    const eventSpy = jest.spyOn(component.buttonClick, 'emit').mockImplementation()
    const form = { email: 'test@teste', password: '' }
    component.loginForm.patchValue(form)

    component.handleButtonClick()

    expect(eventSpy).not.toHaveBeenCalled()
  })
});
