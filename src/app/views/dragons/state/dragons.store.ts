import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Dragon, DragonsState } from './dragons.model';

export function createInitialState(): DragonsState {
  return {
    dragons: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dragons' })
export class DragonsStore extends Store<DragonsState> {
  constructor() {
    super(createInitialState());
  }

  deleteDragon(id: string) {
    const { dragons } = this.getValue();
    const newValue = [...dragons];

    const index = this.getIndexById(id);
    newValue.splice(index, 1);

    this.update(() => ({ dragons: newValue }));
  }

  updateDragon(dragon: Dragon) {
    const { dragons } = this.getValue();
    const newValue = [...dragons];
    const index = this.getIndexById(dragon.id);

    newValue[index] = { ...dragon };

    this.update(() => ({ dragons: newValue }));
  }

  private getIndexById(id: string) {
    const { dragons } = this.getValue();

    const index = dragons.findIndex(({ id: dragonId }) => dragonId === id);

    return index;
  }
}
