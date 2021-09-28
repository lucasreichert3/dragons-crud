import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let formTest: FormGroup;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.formGroup = fb.group({ test: fb.control('') });
    component.name = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('show input errors', () => {
    it('should return errors array', () => {
      component.errorMessages = { required: 'required error message' };
      jest
        .spyOn(component, 'getFormField')
        .mockReturnValue({ errors: { required: true } } as any);

      expect(component.getErrorMessagesList()).toEqual([
        'required error message',
      ]);
    });

    it('should not return errors array', () => {
      component.errorMessages = { required: 'required error message' };
      jest
        .spyOn(component, 'getFormField')
        .mockReturnValue({ errors: {} } as any);

      expect(component.getErrorMessagesList()).toEqual([]);
    });
  });

  it('should get input controller', () => {
    const spy = jest.spyOn(component.formGroup, 'get').mockImplementation();

    component.getFormField('test');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('test');
  });

  describe('should validate field', () => {
    it('should return false when field has not errors', () => {
      jest.spyOn(component, 'getFormField').mockReturnValue({} as any);

      expect(component.validateField('test')).toBeFalsy();
    });

    it('should return false when field is not dirty', () => {
      jest
        .spyOn(component, 'getFormField')
        .mockReturnValue({ errors: { required: true }, dirty: false } as any);

      expect(component.validateField('test')).toBeFalsy();
    });

    it('should return false when field is dirty and has error', () => {
      jest
        .spyOn(component, 'getFormField')
        .mockReturnValue({ errors: { required: true }, dirty: true } as any);

      expect(component.validateField('test')).toBeTruthy();
    });
  });
});
