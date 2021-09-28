import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../views/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class CanLoadDragons implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const loggedUser = this.authService.getCurrentUser();

    if (!loggedUser) this.router.navigate(['/login']);

    return !!this.authService.getCurrentUser();;
  }
}
