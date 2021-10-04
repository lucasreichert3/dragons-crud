import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dragon, DragonCreateInput } from './dragons.model';
import { dragonApiUrl } from '../../../constants/api';
import { DragonsStore } from './dragons.store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DragonsService {
  constructor(private http: HttpClient, private dragonsStore: DragonsStore) {}

  getAllDragons(): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(dragonApiUrl).pipe(
      tap((dragons) =>
        this.dragonsStore.update(() => ({
          dragons,
        }))
      )
    );
  }

  getDragon(id: string): Observable<Dragon> {
    return this.http.get<Dragon>(`${dragonApiUrl}/${id}`);
  }

  saveDragon(input: DragonCreateInput) {
    return this.http.post<Dragon>(dragonApiUrl, input).pipe(
      tap((dragon) =>
        this.dragonsStore.update((entity) => ({
          dragons: [...entity.dragons, dragon],
        }))
      )
    );
  }

  update(dragon: Dragon) {
    return this.http
      .put<Dragon>(`${dragonApiUrl}/${dragon.id}`, dragon)
      .pipe(tap((dragon) => this.dragonsStore.updateDragon(dragon)));
  }

  deleteDragon(id: string): Observable<Dragon> {
    return this.http
      .delete<Dragon>(`${dragonApiUrl}/${id}`)
      .pipe(tap(() => this.dragonsStore.deleteDragon(id)));
  }
}
