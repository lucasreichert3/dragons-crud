import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimpleModalModule, SimpleModalService } from 'ngx-simple-modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../components/confirmation-modal/confirmation-modal.component';
import { LoadingModule } from '../../../../components/loading/loading.module';
import { DragonsService } from '../../state/dragons.service';

import { DragonListItemComponent } from './dragon-list-item.component';

const mockDragon = {
  id: '1',
  name: 'test',
  type: 'test',
  avatar: 'test',
  createdAt: Date.now().toString(),
};

describe('DragonListItemComponent', () => {
  let component: DragonListItemComponent;
  let fixture: ComponentFixture<DragonListItemComponent>;
  let modalService: SimpleModalService;
  let dragonService: DragonsService;
  let toastService: ToastrService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragonListItemComponent],
      imports: [
        LoadingModule,
        FontAwesomeModule,
        SimpleModalModule.forRoot({ container: '' }),
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonListItemComponent);
    modalService = TestBed.inject(SimpleModalService);
    dragonService = TestBed.inject(DragonsService);
    toastService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showConfirm', () => {
    it('should delete dragon when confirm', () => {
      component.dragon = mockDragon;
      const serviceSpy = jest
        .spyOn(modalService, 'addModal')
        .mockReturnValue(of(true));
      const deleteSpy = jest
        .spyOn(component, 'deleteDragon')
        .mockImplementation();

      component.showConfirm();

      expect(serviceSpy).toHaveBeenCalledWith(ConfirmationModalComponent, {
        title: 'Exclusão de item',
        message: `Tem certeza que deseja excluir o dragão: ${mockDragon.name}?`,
      });
      expect(deleteSpy).toHaveBeenCalled();
    });

    it('should not delete dragon when confirm', () => {
      component.dragon = mockDragon;
      const serviceSpy = jest
        .spyOn(modalService, 'addModal')
        .mockReturnValue(of(false));
      const deleteSpy = jest
        .spyOn(component, 'deleteDragon')
        .mockImplementation();

      component.showConfirm();

      expect(serviceSpy).toHaveBeenCalledWith(ConfirmationModalComponent, {
        title: 'Exclusão de item',
        message: `Tem certeza que deseja excluir o dragão: ${mockDragon.name}?`,
      });
      expect(deleteSpy).not.toHaveBeenCalled();
    });
  });

  describe('deleteDragon', () => {
    it('success callback', () => {
      const serviceSpy = jest
        .spyOn(dragonService, 'deleteDragon')
        .mockReturnValue(of(mockDragon));
      const toastSpy = jest.spyOn(toastService, 'success').mockImplementation();
      component.dragon = mockDragon;

      component.deleteDragon();

      expect(serviceSpy).toHaveBeenCalledWith(mockDragon.id);
      expect(component.loading).toBeFalsy();
      expect(toastSpy).toHaveBeenCalledWith('Dragão excluído com sucesso!');
    });

    it('error callback', () => {
      const serviceSpy = jest
        .spyOn(dragonService, 'deleteDragon')
        .mockReturnValue(throwError(''));
      const toastSpy = jest.spyOn(toastService, 'success').mockImplementation();
      const errorSpy = jest
        .spyOn(component, 'showErrorMessage')
        .mockImplementation();
      component.dragon = mockDragon;

      component.deleteDragon();

      expect(serviceSpy).toHaveBeenCalledWith(mockDragon.id);
      expect(component.loading).toBeFalsy();
      expect(toastSpy).not.toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(
        'Ocorreu um problema e não foi possível excluir o dragão!',
        'Não foi possível excluir!'
      );
    });
  });

  it('error message should show error toast', () => {
    const toastSpy = jest.spyOn(toastService, 'error').mockImplementation();

    component.showErrorMessage('message', 'title')

    expect(toastSpy).toHaveBeenCalledWith('message', 'title')
  })

  it('should redirect to detail', () => {
    component.dragon = mockDragon
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation()

    component.redirectToDetail()

    expect(routerSpy).toHaveBeenCalledWith(['/dragons', mockDragon.id])
  })
});
