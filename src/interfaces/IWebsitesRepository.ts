import { WebsiteEntity } from "interfaces.foudroyer.com";
import { IRepositoryResponse } from "./IApiResponse";

export type ActivateResponse = IRepositoryResponse<WebsiteEntity>;
export type UpdateSitemapResponse = IRepositoryResponse<WebsiteEntity>;
export type UpdateCredentialsResponse = IRepositoryResponse<any>;
export type FetchResponse = IRepositoryResponse<{
  google: WebsiteEntity[];
  websites: WebsiteEntity[];
}>;

export type CheckResponseEntity = {
  isCredentialsValid: boolean;
  isSitemapValid: boolean;
};

export type CheckResponse = IRepositoryResponse<CheckResponseEntity>;
export type RefreshSitemapAndIndexationResponse = IRepositoryResponse<{
  success: boolean;
}>;

export interface IWebsitesRepository {
  updateCredentials(params: {
    website: string;
    credentials: string;
  }): Promise<UpdateCredentialsResponse>;
  refreshSitemapAndIndexation(params: {
    websiteId: string;
  }): Promise<RefreshSitemapAndIndexationResponse>;
  check(params: { website: string }): Promise<CheckResponse>;
  fetch(): Promise<FetchResponse>;
  activate(domain: string): Promise<ActivateResponse>;
  updateSitemap(params: {
    website: string;
    sitemap: string;
  }): Promise<UpdateSitemapResponse>;
}
