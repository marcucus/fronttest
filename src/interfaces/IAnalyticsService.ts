import { AnalyticsEntity } from "../entities/AnalyticsEntity"

export interface IAnalyticsService {
  logout(): Promise<void>;
  authenticate(params: { id: string; }): Promise<void>;
  send(analytics: AnalyticsEntity): any
}
