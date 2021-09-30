import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Dragon, DragonsState } from './dragons.model';
import { DragonsStore } from './dragons.store';

@Injectable({ providedIn: 'root' })
export class DragonsQuery extends Query<DragonsState> {
  constructor(protected store: DragonsStore) {
    super(store);
  }

  getAlphabeticOrder(): Observable<Dragon[]> {
    return this.select(({ dragons }) => {
      return dragons.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
