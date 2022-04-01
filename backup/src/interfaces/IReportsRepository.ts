import { ReportEntity } from "../entities/ReportEntity";
import { IRepositoryResponse } from "./IApiResponse";

export type FetchResponse = IRepositoryResponse<ReportEntity[]>;
export interface IReportsRepository {
  fetch(params: { website: string }): Promise<FetchResponse>;
}
