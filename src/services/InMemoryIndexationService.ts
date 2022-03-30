import { ErrorEntity } from "interfaces.foudroyer.com";
import {
  IIndexationService,
  IndexResponseType,
} from "../interfaces/IIndexationService";

export class InMemoryIndexationService implements IIndexationService {
  private requests: number = 0;

  getAllRequestsNumber() {
    return this.requests;
  }

  async index(params: {
    url: string;
    website: string;
  }): Promise<IndexResponseType> {
    this.requests = this.requests + 1;

    if (params.url.includes("quota-exceed"))
      return {
        error: true,
        code: ErrorEntity.CREDENTIALS_NOT_FOUND,
      };

    if (params.url.includes("credentials-error"))
      return {
        error: true,
        code: ErrorEntity.GOOGLE_AUTH_CREDENTIALS_EXPIRED,
      };

    return { error: false, body: "" };
  }
}
