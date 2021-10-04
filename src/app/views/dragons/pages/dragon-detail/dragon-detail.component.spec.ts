import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of, throwError } from 'rxjs';
import { EmptyStateModule } from '../../../../components/empty-state/empty-state.module';
import { LoadingModule } from '../../../../components/loading/loading.module';
import { DragonsService } from '../../state/dragons.service';

import { DragonDetailComponent } from './dragon-detail.component';

const mockDragon = {
  id: '1',
  name: 'test',
  type: 'test',
  avatar: 'test',
  createdAt: Date.now().toString(),
};

describe('DragonDetailComponent', () => {
  let component: DragonDetailComponent;
  let fixture: ComponentFixture<DragonDetailComponent>;
  let dragonsService: DragonsService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragonDetailComponent],
      imports: [
        FontAwesomeModule,
        LoadingModule,
        EmptyStateModule,
        RouterTestingModule,
        HttpClientModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonDetailComponent);
    dragonsService = TestBed.inject(DragonsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dragon when init', () => {
    const getDragonSpy = jest
      .spyOn(component, 'getDragon')
      .mockImplementation();

    component.ngOnInit();

    expect(getDragonSpy).toHaveBeenCalled();
  });

  describe('getDragon', () => {
    it('success callback', () => {
      activatedRoute.snapshot.params = { id: '2' };
      const serviceSpy = jest
        .spyOn(dragonsService, 'getDragon')
        .mockReturnValue(of(mockDragon));

      component.getDragon();

      expect(serviceSpy).toHaveBeenCalledWith('2');
      expect(component.loading).toBeFalsy();
      expect(component.dragon).toEqual(mockDragon);
    });

    it('error callback', () => {
      activatedRoute.snapshot.params = { id: '2' };
      const serviceSpy = jest
        .spyOn(dragonsService, 'getDragon')
        .mockReturnValue(throwError(''));

      component.getDragon();

      expect(serviceSpy).toHaveBeenCalledWith('2');
      expect(component.loading).toBeFalsy();
      expect(component.errorMessage).toBeTruthy();
      expect(component.dragon).toBeUndefined();
    });
  });

  it('should back to list', () => {
    const routerSpy = jest.spyOn(router, 'navigate').mockImplementation();

    component.backToList();

    expect(routerSpy).toHaveBeenCalledWith(['/dragons']);
  });

  it('should try to get dragon again', () => {
    const getDragonSpy = jest
      .spyOn(component, 'getDragon')
      .mockImplementation();
    component.errorMessage = true;

    component.tryAgain();

    expect(getDragonSpy).toHaveBeenCalled();
    expect(component.errorMessage).toBeFalsy();
  });
});
