import { TestBed } from '@angular/core/testing';

import { DragonsService } from './state/dragons.service';

describe('DragonsService', () => {
  let service: DragonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
