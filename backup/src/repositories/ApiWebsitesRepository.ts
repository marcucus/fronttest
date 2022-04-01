import { ErrorEntity, WebsiteEntity } from "interfaces.foudroyer.com";
import {
  ActivateResponse,
  CheckResponse,
  FetchResponse,
  IWebsitesRepository,
  RefreshSitemapAndIndexationResponse,
  UpdateCredentialsResponse,
  UpdateSitemapResponse,
} from "../interfaces/IWebsitesRepository";
import { ApiService } from "../services/ApiService";

export class ApiWebsitesRepository implements IWebsitesRepository {
  constructor(private apiService: ApiService) {}

  async fetch(): Promise<FetchResponse> {
    try {
      const response = await this.apiService.get<{
        google: WebsiteEntity[];
        websites: WebsiteEntity[];
      }>(`/websites`);

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message };

      return { error: false, body: response.data };
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR };
    }
  }

  private async updateCredentialsRequest(params: {
    website: string;
    credentials: string;
  }): Promise<UpdateCredentialsResponse> {
    const response = await this.apiService.put<void>(
      "/websites/update-google-cloud-api",
      {
        key: params.credentials,
        websiteId: params.website,
      }
    );

    if (response.data.statusCode === 400)
      return { error: true, code: response.data.message };

    return { error: false, body: response.data };
  }

  async updateCredentials(params: {
    website: string;
    credentials: string;
  }): Promise<UpdateCredentialsResponse> {
    try {
      return await this.updateCredentialsRequest(params);
    } catch (error) {
      try {
        return await this.updateCredentialsRequest(params);
      } catch (error) {
        return { error: true, code: ErrorEntity.UNKNOWN_ERROR };
      }
    }
  }

  async check(params: { website: string }): Promise<CheckResponse> {
    try {
      const response = await this.apiService.get<{
        isCredentialsValid: boolean;
        isSitemapValid: boolean;
      }>(`/websites/check?website=${params.website}`);

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message };

      return { error: false, body: response.data };
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR };
    }
  }

  async refreshSitemapAndIndexation(params: {
    websiteId: string;
  }): Promise<RefreshSitemapAndIndexationResponse> {
    try {
      const response = await this.apiService.post<{
        success: boolean;
      }>(`/websites/cron-sitemap-and-indexation`, {
        websiteId: params.websiteId,
      });

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message };

      return { error: false, body: response.data };
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR };
    }
  }

  async activate(domain: string): Promise<ActivateResponse> {
    try {
      const response = await this.apiService.post<WebsiteEntity>(`/websites`, {
        searchConsoleDomain: domain,
      });

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message };

      return { error: false, body: response.data };
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR };
    }
  }

  async updateSitemap(params: {
    website: string;
    sitemap: string;
  }): Promise<UpdateSitemapResponse> {
    try {
      const response = await this.apiService.put<WebsiteEntity>(`/websites`, {
        sitemap: params.sitemap,
        websiteId: params.website,
      });

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message };

      return { error: false, body: response.data };
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR };
    }
  }
}
