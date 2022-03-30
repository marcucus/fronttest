import {
  ErrorEntity,
  IndexationType,
  PageEntity,
} from "interfaces.foudroyer.com";
import { ReportEntity } from "../entities/ReportEntity";
import {
  FetchResponse,
  IReportsRepository,
} from "../interfaces/IReportsRepository";
import { ApiService } from "../services/ApiService";

export class ApiReportsRepository implements IReportsRepository {
  constructor(private apiService: ApiService) {}

  async fetch(params: { website: string }): Promise<FetchResponse> {
    try {
      const types: PageEntity["indexation_state"][] = [
        IndexationType.INDEXED,
        IndexationType.NOT_INDEXED,
      ];

      const total = await this.apiService.get<{ total: number }>(
        `/pages/count?website=${params.website}`
      );

      if (total.data.statusCode === 400) {
        return { error: true, code: total.data.message };
      }

      const totalAllCount = total.data.total;

      const reports = await Promise.all(
        types.map(async (type): Promise<ReportEntity> => {
          const response = await this.apiService.get<{ total: number }>(
            `/pages/count?website=${params.website}&indexation=${type}`
          );

          if (response.data.statusCode === 400) {
            throw new Error(response.data.message);
          }

          return {
            type,
            value: response.data.total,
            percentage: Math.round((response.data.total / totalAllCount) * 100),
          };
        })
      );

      return { error: false, body: reports };
    } catch (error) {
      const err = error as { message: ErrorEntity };

      return { error: true, code: err.message };
    }
  }
}
