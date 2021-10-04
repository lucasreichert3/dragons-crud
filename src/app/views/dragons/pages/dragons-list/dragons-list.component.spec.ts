import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingModule } from '../../../../components/loading/loading.module';
import { ButtonModule } from '../../../../components/button/button.module';
import { DragonEditModalModule } from '../../components/dragon-edit-modal/dragon-edit-modal.module';

import { DragonsListComponent } from './dragons-list.component';
import { EmptyStateModule } from '../../../../components/empty-state/empty-state.module';
import { DragonListItemModule } from '../../components/dragon-list-item/dragon-list-item.module';
import { HttpClientModule } from '@angular/common/http';
import { DragonsQuery } from '../../state/dragons.query';
import { of, throwError } from 'rxjs';
import { DragonsService } from '../../state/dragons.service';

const mockDragon = {
  id: '1',
  name: 'test',
  type: 'test',
  avatar: 'test',
  createdAt: Date.now().toString(),
};

const mockList = [mockDragon, { ...mockDragon, id: '2' }];

describe('DragonsListComponent', () => {
  let component: DragonsListComponent;
  let fixture: ComponentFixture<DragonsListComponent>;
  let query: DragonsQuery;
  let dragonService: DragonsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragonsListComponent],
      imports: [
        DragonEditModalModule,
        ButtonModule,
        LoadingModule,
        EmptyStateModule,
        DragonListItemModule,
        HttpClientModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonsListComponent);
    query = TestBed.inject(DragonsQuery);
    dragonService = TestBed.inject(DragonsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list dragons when init', () => {
    const loadDragonsSpy = jest
      .spyOn(component, 'loadDragons')
      .mockImplementation();
    const listenDragonsSpy = jest
      .spyOn(component, 'listenDragonsStore')
      .mockImplementation();

    component.ngOnInit();

    expect(loadDragonsSpy).toHaveBeenCalled();
    expect(listenDragonsSpy).toHaveBeenCalled();
  });

  it('should get list from store', () => {
    const querySpy = jest
      .spyOn(query, 'getAlphabeticOrder')
      .mockReturnValue(of(mockList));

    component.listenDragonsStore();

    expect(querySpy).toHaveBeenCalled();
    expect(component.dragons).toEqual(mockList);
  });

  describe('load dragons', () => {
    it('success callback', () => {
      const serviceSpy = jest
        .spyOn(dragonService, 'getAllDragons')
        .mockReturnValue(of(mockList));

      component.loadDragons();

      expect(component.loading).toBeFalsy();
      expect(serviceSpy).toHaveBeenCalled();
    });

    it('error callback', () => {
      const serviceSpy = jest
        .spyOn(dragonService, 'getAllDragons')
        .mockReturnValue(throwError(''));

      component.loadDragons();

      expect(component.loading).toBeFalsy();
      expect(component.errorMessage).toBeTruthy();
      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe('getEmptyState', () => {
    it('should return error message', () => {
      component.errorMessage = true;
      const tryAgainSpy = jest
        .spyOn(component, 'tryAgain')
        .mockImplementation();

      const errorMessage = component.getEmptyState();

      expect(errorMessage?.title).toEqual('Ocorreu um problema!');
      expect(errorMessage?.description).toEqual(
        'Não foi possível listar os dragões!'
      );
      expect(errorMessage?.buttonText).toEqual('Tentar novamente');
      errorMessage?.buttonCallback();
      expect(tryAgainSpy).toHaveBeenCalled();
    });

    it('should return emtpy state when returns empty array of dragons', () => {
      component.errorMessage = false;
      component.loading = false;
      component.dragons = [];
      const showDragonModalSpy = jest
        .spyOn(component, 'showDragonModal')
        .mockImplementation();

      const errorMessage = component.getEmptyState();

      expect(errorMessage?.title).toEqual('Não há dragões!');
      expect(errorMessage?.description).toEqual(
        'Cadastre um novo dragão no botão!'
      );
      expect(errorMessage?.buttonText).toEqual('Novo dragão');
      errorMessage?.buttonCallback();
      expect(showDragonModalSpy).toHaveBeenCalled();
    });

    it('should return undefined when is loading', () => {
      component.errorMessage = false;
      component.loading = true;

      expect(component.getEmptyState()).toBeUndefined();
    });

    it('should return undefined when has dragons', () => {
      component.errorMessage = false;
      component.loading = false;
      component.dragons = mockList;

      expect(component.getEmptyState()).toBeUndefined();
    });
  });

  describe('showDragonModal', () => {
    it('should open edit modal', () => {
      component.showDragonModal(mockDragon);

      expect(component.editModal).toBeTruthy();
      expect(component.currentEditDragon).toEqual(mockDragon);
    });

    it('should open create modal', () => {
      component.currentEditDragon = mockDragon;
      component.showDragonModal();

      expect(component.editModal).toBeTruthy();
      expect(component.currentEditDragon).toBeUndefined();
    });
  });

  it('should handle modal close', () => {
    component.editModal = true
    component.currentEditDragon = mockDragon
    component.handleEditModalClosed()

    expect(component.editModal).toBeFalsy()
    expect(component.currentEditDragon).toBeUndefined()
  });

  it('should try again', () => {
    component.errorMessage = true
    const spy = jest.spyOn(component, 'loadDragons').mockImplementation()

    component.tryAgain()

    expect(component.errorMessage).toBeFalsy()
    expect(spy).toHaveBeenCalled()
  })
});
