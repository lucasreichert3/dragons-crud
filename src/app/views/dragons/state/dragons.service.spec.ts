import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DragonsService } from './dragons.service';
import { DragonsStore } from './dragons.store';
import { dragonApiUrl } from '../../../constants/api';
import { DragonCreateInput } from './dragons.model';

const mockDragon = {
  id: '1',
  name: 'test',
  type: 'test',
  avatar: 'test',
  createdAt: Date.now().toString(),
};

const mockList = [mockDragon, { ...mockDragon, id: '2' }];

describe('DragonsService', () => {
  let service: DragonsService;
  let store: DragonsStore;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(DragonsService);
    store = TestBed.inject(DragonsStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllDragons', () => {
    const spy = jest.spyOn(store, 'update').mockImplementation();
    service.getAllDragons().subscribe();

    const req = httpTestingController.expectOne(dragonApiUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(mockList);
    httpTestingController.verify();

    expect(spy).toHaveBeenCalled();
  });

  it('getDragon', () => {
    service.getDragon('1').subscribe();

    const req = httpTestingController.expectOne(`${dragonApiUrl}/1`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockDragon);
    httpTestingController.verify();
  });

  it('saveDragon', () => {
    const saveInput: DragonCreateInput = { name: 'test', avatar: 'a', type: 'test' }
    const spy = jest.spyOn(store, 'update').mockImplementation();
    service.saveDragon(saveInput).subscribe();

    const req = httpTestingController.expectOne(dragonApiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(saveInput);

    req.flush(mockDragon);
    httpTestingController.verify();

    expect(spy).toHaveBeenCalled();
  });

  it('update', () => {
    const spy = jest.spyOn(store, 'updateDragon').mockImplementation();
    service.update(mockDragon).subscribe();

    const req = httpTestingController.expectOne(`${dragonApiUrl}/1`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockDragon);

    req.flush(mockDragon);
    httpTestingController.verify();

    expect(spy).toHaveBeenCalled();
  });

  it('delete', () => {
    const spy = jest.spyOn(store, 'deleteDragon').mockImplementation();
    service.deleteDragon('1').subscribe();

    const req = httpTestingController.expectOne(`${dragonApiUrl}/1`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(mockDragon);
    httpTestingController.verify();

    expect(spy).toHaveBeenCalled();
  });

});
