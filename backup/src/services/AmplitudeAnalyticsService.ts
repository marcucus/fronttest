import amplitude from "amplitude-js";
import { AnalyticsEntity } from "../entities/AnalyticsEntity";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";

export class AmplitudeAnalyticsService implements IAnalyticsService {
  constructor() {
    amplitude.getInstance().init("fc39e1c21e5a62e74bccb558f92cad3a");
  }

  send(analytics: AnalyticsEntity) {
    const { category, action, data } = analytics;
    try {
      amplitude.getInstance().logEvent(`${category}/${action}`, data || {});
    } catch (e) {}
  }

  async authenticate(params: { id: string }): Promise<void> {
    try {
      amplitude.getInstance().setUserId(params.id);
    } catch (e) {}
  }

  async logout(): Promise<void> {
    try {
      amplitude.getInstance().setUserId(null);
    } catch (e) {}
  }
}
