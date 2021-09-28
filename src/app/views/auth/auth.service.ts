import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { StorageKey, User } from './auth.model';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private storageService: LocalStorageService
  ) {}

  getCurrentUser(): User | undefined {
    const user = this.cookieService.get(StorageKey.loggedUser);

    if (!user) return;

    return JSON.parse(user);
  }

  login(user: User) {
    const users = this.getUsersList();

    const logged = users.find(
      ({ email, password }) =>
        email === user.email && password === user.password
    );

    if (!logged) throw new Error('Usuário não encontrado!');

    this.saveUser(user);
  }

  logout() {
    this.cookieService.remove(StorageKey.loggedUser);
  }

  saveUser(user: User) {
    this.cookieService.put(StorageKey.loggedUser, JSON.stringify(user));
  }

  createUser(user: User) {
    const users = this.getUsersList();

    const exist = users.find(({ email }) => email === user.email);

    if (exist) throw new Error('Email já cadastrado');

    const newUsers = [...users, user];

    this.storageService.set(StorageKey.userList, newUsers);
    this.saveUser(user);
  }

  getUsersList(): User[] {
    return this.storageService.get(StorageKey.userList) || [];
  }
}
