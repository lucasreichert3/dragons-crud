export interface User {
  email: string;
  password: string;
}

export enum StorageKey {
  loggedUser = 'loggedUser',
  userList = 'userList'
}
