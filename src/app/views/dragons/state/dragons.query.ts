import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { DragonsState } from './dragons.model';
import { DragonsStore } from './dragons.store';

@Injectable({ providedIn: 'root' })
export class DragonsQuery extends Query<DragonsState> {

  constructor(protected store: DragonsStore) {
    super(store);
  }

}
