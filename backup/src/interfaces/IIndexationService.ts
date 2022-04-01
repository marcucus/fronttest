import { IRepositoryResponse } from "./IApiResponse";

export type IndexResponseType = IRepositoryResponse<any>;

export interface IIndexationService {
  index(params: { url: string; website: string }): Promise<IndexResponseType>;
}
