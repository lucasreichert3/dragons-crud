import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '../../../../components/loading/loading.module';
import { ButtonModule } from '../../../../components/button/button.module';
import { InputModule } from '../../../../components/input/input.module';

import { DragonFormComponent } from './dragon-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { DragonsService } from '../../state/dragons.service';

const mockDragon = {
  id: '1',
  name: 'test',
  type: 'test',
  avatar: 'test',
  createdAt: Date.now().toString(),
};

describe('DragonFormComponent', () => {
  let component: DragonFormComponent;
  let fixture: ComponentFixture<DragonFormComponent>;
  let toastService: ToastrService
  let dragonService: DragonsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragonFormComponent],
      imports: [
        InputModule,
        ButtonModule,
        ReactiveFormsModule,
        LoadingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonFormComponent);
    toastService = TestBed.inject(ToastrService)
    dragonService = TestBed.inject(DragonsService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init form', () => {
    it('should init form with value', () => {
      component.dragon = mockDragon;
      component.ngOnInit();

      expect(component.dragonForm.value).toEqual({
        name: 'test',
        type: 'test',
        avatar: 'test',
      });
    });

    it('should init empty form', () => {
      component.dragon = undefined;
      component.ngOnInit();

      expect(component.dragonForm.value).toEqual({
        name: '',
        type: '',
        avatar: '',
      });
    });
  });

  describe('handleSave', () => {
    it('should save dragon', () => {
      const saveSpy = jest.spyOn(component, 'saveDragon').mockImplementation();
      component.dragonForm.patchValue({
        name: 'teste',
        type: 'teste',
        avatar: 'a',
      });

      component.handleSave();

      expect(saveSpy).toHaveBeenCalled();
    });

    it('should not save dragon', () => {
      const saveSpy = jest.spyOn(component, 'saveDragon').mockImplementation();
      component.dragonForm.patchValue({ name: '', type: '', avatar: '' });

      component.handleSave();

      expect(saveSpy).not.toHaveBeenCalled();
    });
  });

  describe('saveDragon', () => {
    it('should save dragon', () => {
      const formValue = { name: 'teste', type: 'teste', avatar: 'a' };
      component.dragonForm.patchValue(formValue);
      const mockReturn = jest
        .spyOn(component, 'getSaveDragonObservable')
        .mockReturnValue(of(mockDragon));
      const eventSpy = jest.spyOn(component.saved, 'emit').mockImplementation();
      const actionTextSpy = jest
        .spyOn(component, 'getActionText')
        .mockReturnValue({ success: 'success', error: 'error' });
      const messageSpy = jest
        .spyOn(component, 'showMessage')
        .mockImplementation();

      component.saveDragon();

      expect(component.loading).toBeFalsy();
      expect(eventSpy).toHaveBeenCalledWith(formValue);
      expect(mockReturn).toHaveBeenCalled();
      expect(actionTextSpy).toHaveBeenCalled();
      expect(messageSpy).toHaveBeenCalledWith(
        false,
        'Dragão success com sucesso!'
      );
    });

    it('should save dragon', () => {
      const formValue = { name: 'teste', type: 'teste', avatar: 'a' };
      component.dragonForm.patchValue(formValue);
      const mockReturn = jest
        .spyOn(component, 'getSaveDragonObservable')
        .mockReturnValue(throwError(''));
      const eventSpy = jest.spyOn(component.saved, 'emit').mockImplementation();
      const actionTextSpy = jest
        .spyOn(component, 'getActionText')
        .mockReturnValue({ success: 'success', error: 'error' });
      const messageSpy = jest
        .spyOn(component, 'showMessage')
        .mockImplementation();

      component.saveDragon();

      expect(component.loading).toBeFalsy();
      expect(eventSpy).not.toHaveBeenCalled();
      expect(mockReturn).toHaveBeenCalled();
      expect(actionTextSpy).toHaveBeenCalled();
      expect(messageSpy).toHaveBeenCalledWith(
        true,
        'Ocorreu um problema ao error o dragão!'
      );
    });
  });

  describe('getActionText', () => {
    it('when has dragon', () => {
      component.dragon = mockDragon;

      expect(component.getActionText()).toEqual({
        success: 'alterado',
        error: 'alterar',
      });
    });

    it('when has not dragon', () => {
      component.dragon = undefined;

      expect(component.getActionText()).toEqual({
        success: 'salvo',
        error: 'salvar',
      });
    });
  });

  describe('showMessage', () => {
    it('success message', () => {
      const successSpy = jest.spyOn(toastService, 'success').mockImplementation()

      component.showMessage(false, 'test', 'test2')

      expect(successSpy).toHaveBeenCalledWith('test', 'test2')
    })

    it('success message', () => {
      const errorSpy = jest.spyOn(toastService, 'error').mockImplementation()

      component.showMessage(true, 'test', 'test2')

      expect(errorSpy).toHaveBeenCalledWith('test', 'test2')
    })
  })

  describe('getSaveDragonObservable', () => {
    it('should return save request', () => {
      component.dragon = undefined
      const formValue = { name: 'teste', type: 'teste', avatar: 'a' };
      component.dragonForm.patchValue(formValue);
      const serviceSpy = jest.spyOn(dragonService, 'saveDragon').mockReturnValue(of(mockDragon))

      component.getSaveDragonObservable()

      expect(serviceSpy).toHaveBeenCalledWith(formValue)
    })

    it('should return update request', () => {
      component.dragon = mockDragon
      const formValue = { name: 'updated', type: 'updated', avatar: 'updated' };
      component.dragonForm.patchValue(formValue);
      const serviceSpy = jest.spyOn(dragonService, 'update').mockReturnValue(of({...mockDragon, ...formValue}))

      component.getSaveDragonObservable()

      expect(serviceSpy).toHaveBeenCalledWith({...mockDragon, ...formValue})
    })
  })
});
