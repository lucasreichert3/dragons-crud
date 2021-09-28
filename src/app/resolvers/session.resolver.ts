import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { User } from '../views/auth/auth.model';
import { AuthService } from '../views/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class SessionResolver implements Resolve<User | undefined> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(): User | undefined {
    const loggedUser = this.authService.getCurrentUser();

    if (loggedUser) this.router.navigate(['/dragons']);

    return loggedUser;
  }
}
