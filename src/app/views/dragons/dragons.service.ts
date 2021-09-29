import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dragon } from './dragons.model';
import { dragonApiUrl } from 'src/app/constants/api';

@Injectable({
  providedIn: 'root',
})
export class DragonsService {
  constructor(private http: HttpClient) {}

  getAllDragons(): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(dragonApiUrl);
  }

  deleteDragon(id: string): Observable<Dragon> {
    return this.http.delete<Dragon>(`${dragonApiUrl}/${id}`);
  }
}
