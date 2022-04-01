import { ReportEntity } from "../entities/ReportEntity";
import {
  FetchResponse,
  IReportsRepository,
} from "../interfaces/IReportsRepository";

export class InMemoryReportsRepository implements IReportsRepository {
  private reports: ReportEntity[] = [];

  async store(reports: ReportEntity[]) {
    this.reports = reports;
  }

  async fetch(): Promise<FetchResponse> {
    return { error: false, body: this.reports };
  }
}
