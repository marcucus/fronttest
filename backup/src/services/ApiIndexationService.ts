import { ErrorEntity } from "interfaces.foudroyer.com";
import {
  IIndexationService,
  IndexResponseType,
} from "../interfaces/IIndexationService";
import { ApiService } from "./ApiService";

export class ApiIndexationService implements IIndexationService {
  constructor(private apiService: ApiService) {}

  async index(params: {
    url: string;
    website: string;
  }): Promise<IndexResponseType> {
    try {
      const response = await this.apiService.post<IndexResponseType>(
        `/indexation`,
        params
      );

      if (response.data.statusCode === 400)
        return {
          error: true,
          code: response.data.message,
        };

      return {
        error: false,
        body: "",
      };
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR };
    }
  }
}
