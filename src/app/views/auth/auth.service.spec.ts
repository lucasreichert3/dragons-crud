import { TestBed } from '@angular/core/testing';
import { CookieModule, CookieService } from 'ngx-cookie';
import { LocalStorageService, NgxLocalStorageModule } from 'ngx-localstorage';
import { StorageKey, User } from './auth.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: CookieService;
  let storageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CookieModule.forRoot(), NgxLocalStorageModule.forRoot()],
    });
    service = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    storageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentUser', () => {
    it('should return user', () => {
      const loggedUser = { email: 'test@teste', password: '123' } as User;
      const spy = jest
        .spyOn(cookieService, 'get')
        .mockReturnValue(JSON.stringify(loggedUser));

      expect(service.getCurrentUser()).toEqual(loggedUser);
      expect(spy).toHaveBeenCalledWith(StorageKey.loggedUser);
    });

    it('should not return user', () => {
      const spy = jest.spyOn(cookieService, 'get').mockReturnValue('');

      expect(service.getCurrentUser()).toEqual(undefined);
      expect(spy).toHaveBeenCalledWith(StorageKey.loggedUser);
    });
  });

  describe('login', () => {
    it('should login', () => {
      const loggedUser = { email: 'test@teste', password: '123' } as User;
      const getListSpy = jest
        .spyOn(service, 'getUsersList')
        .mockReturnValue([loggedUser]);
      const saveSpy = jest.spyOn(service, 'saveUser').mockImplementation();

      service.login(loggedUser);

      expect(saveSpy).toHaveBeenCalledWith(loggedUser);
      expect(getListSpy).toHaveBeenCalled();
    });

    it('should not login', () => {
      const loggedUser = { email: 'test@teste', password: '123' } as User;
      const getListSpy = jest
        .spyOn(service, 'getUsersList')
        .mockReturnValue([{ ...loggedUser, password: '321' }]);
      const saveSpy = jest.spyOn(service, 'saveUser').mockImplementation();

      try {
        service.login(loggedUser);
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error).toBeDefined();
      }

      expect(saveSpy).not.toHaveBeenCalled();
      expect(getListSpy).toHaveBeenCalled();
    });
  });

  it('logout should remove logged key from cookie', () => {
    const cookieSpy = jest.spyOn(cookieService, 'remove').mockImplementation();

    service.logout();

    expect(cookieSpy).toHaveBeenCalledWith(StorageKey.loggedUser);
  });

  it('saveUser should add logged user with cookie service', () => {
    const loggedUser = { email: 'test@teste', password: '123' } as User;
    const cookieSpy = jest.spyOn(cookieService, 'put').mockImplementation();

    service.saveUser(loggedUser);

    expect(cookieSpy).toHaveBeenCalledWith(
      StorageKey.loggedUser,
      JSON.stringify(loggedUser)
    );
  });

  describe('createUser', () => {
    it('should create user', () => {
      const loggedUser = { email: 'test@teste', password: '123' } as User;
      const otherUser = { ...loggedUser, email: 'aa@teste' };
      const getListSpy = jest
        .spyOn(service, 'getUsersList')
        .mockReturnValue([otherUser]);
      const saveSpy = jest.spyOn(service, 'saveUser').mockImplementation();
      const storageSpy = jest.spyOn(storageService, 'set').mockImplementation();

      service.createUser(loggedUser);

      expect(saveSpy).toHaveBeenCalledWith(loggedUser);
      expect(getListSpy).toHaveBeenCalled();
      expect(storageSpy).toHaveBeenCalledWith(StorageKey.userList, [
        otherUser,
        loggedUser,
      ]);
    });

    it('should not create user', () => {
      const loggedUser = { email: 'test@teste', password: '123' } as User;
      const getListSpy = jest
        .spyOn(service, 'getUsersList')
        .mockReturnValue([loggedUser]);
      const saveSpy = jest.spyOn(service, 'saveUser').mockImplementation();
      const storageSpy = jest.spyOn(storageService, 'set').mockImplementation();

      try {
        service.createUser(loggedUser);
      } catch (error) {
        expect(error).toBeDefined();
      }

      expect(saveSpy).not.toHaveBeenCalled();
      expect(getListSpy).toHaveBeenCalled();
      expect(storageSpy).not.toHaveBeenCalled();
    });
  });

  describe('getUsersList', () => {
    it('should list return users from storage', () => {
      const user = { email: 'test@teste', password: '123' } as User;
      const users = [user, { ...user, email: 'test@a' }];
      const storageSpy = jest.spyOn(storageService, 'get').mockReturnValue(users);

      expect(service.getUsersList()).toEqual(users)
      expect(storageSpy).toHaveBeenCalledWith(StorageKey.userList)
    });

    it('should return empty array', () => {
      const storageSpy = jest.spyOn(storageService, 'get').mockReturnValue(undefined);

      expect(service.getUsersList()).toEqual([])
      expect(storageSpy).toHaveBeenCalledWith(StorageKey.userList)
    });
  });
});
