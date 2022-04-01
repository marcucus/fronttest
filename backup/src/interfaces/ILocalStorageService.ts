export interface ILocalStorageService {
  getToken(): string | null;
  storeToken(token: string): void;
}
