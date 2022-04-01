import { ILocalStorageService } from "../interfaces/ILocalStorageService";

export class LocalstorageService implements ILocalStorageService {
  getToken() {
    return window.localStorage.getItem("token") || null;
  }

  storeToken(token: string) {
    window.localStorage.setItem("token", token);
  }
}
