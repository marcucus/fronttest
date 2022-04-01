import { ILocalStorageService } from "../interfaces/ILocalStorageService";

export class InMemoryLocalStorageService implements ILocalStorageService {
  private token: string | null = null;

  getToken() {
    return this.token;
  }

  storeToken(token: string) {
    this.token = token;
  }
}
