import { ErrorEntity, WebsiteEntity } from "interfaces.foudroyer.com";
import { uniqWith } from "ramda";
import {
  ActivateResponse,
  CheckResponse,
  CheckResponseEntity,
  FetchResponse,
  IWebsitesRepository,
  RefreshSitemapAndIndexationResponse,
  UpdateCredentialsResponse,
  UpdateSitemapResponse,
} from "../interfaces/IWebsitesRepository";

export class InMemoryWebsitesRepository implements IWebsitesRepository {
  private websites: WebsiteEntity[] = [];
  private websitesFromGoogle: WebsiteEntity[] = [];

  private checkResponses: { [x: string]: CheckResponseEntity } = {};
  private updateCredentialsResponses: {
    [x: string]: UpdateCredentialsResponse;
  } = {};
  private updateSitemapResponses: { [x: string]: UpdateSitemapResponse } = {};

  async store(website: WebsiteEntity) {
    this.websites = uniqWith<WebsiteEntity, WebsiteEntity>(
      (a, b) => a.id === b.id
    )([...this.websites, website]);

    return website;
  }

  async check(params: { website: string }): Promise<CheckResponse> {
    const found = this.checkResponses[params.website];

    if (!found) return { error: true, code: ErrorEntity.WEBSITE_NOT_FOUND };

    return { error: false, body: this.checkResponses[params.website] };
  }

  __checkResponse(params: { website: string; response: CheckResponseEntity }) {
    this.checkResponses[params.website] = params.response;
  }

  async storeFromGoogle(website: WebsiteEntity) {
    this.websitesFromGoogle = uniqWith<WebsiteEntity, WebsiteEntity>(
      (a, b) => a.id === b.id
    )([...this.websitesFromGoogle, website]);

    return website;
  }

  async remove(id: WebsiteEntity["id"]) {
    this.websites = this.websites.filter((website) => website.id !== id);
  }

  async fetch(): Promise<FetchResponse> {
    return {
      error: false,
      body: {
        websites: this.websites,
        google: this.websitesFromGoogle,
      },
    };
  }

  async fetchGoogleWebsitesDomain() {
    return this.websitesFromGoogle;
  }

  async activate(domain: string): Promise<ActivateResponse> {
    const website = this.websitesFromGoogle.find(
      ({ search_console_domain }) => search_console_domain === domain
    );

    if (!website) return { error: true, code: ErrorEntity.WEBSITE_NOT_FOUND };

    const entity: WebsiteEntity = { ...website, already_activated: true };

    this.websites.push(entity);

    this.websitesFromGoogle = this.websitesFromGoogle.filter(
      ({ search_console_domain }) => search_console_domain !== domain
    );

    return { body: entity, error: false };
  }

  __updateSitemapResponse(params: {
    website: string;
    response: UpdateSitemapResponse;
  }) {
    this.updateSitemapResponses[params.website] = params.response;
  }

  async updateSitemap(params: {
    website: string;
    sitemap: string;
  }): Promise<UpdateSitemapResponse> {
    if (this.updateSitemapResponses[params.website]) {
      return this.updateSitemapResponses[params.website];
    }

    this.websites = this.websites.map((website) => ({
      ...website,
      sitemap: params.website === website.id ? params.sitemap : website.sitemap,
    }));

    const website = this.websites.find(
      (website) => website.id === params.website
    );

    if (!website) {
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      };
    }

    return {
      error: false,
      body: website,
    };
  }

  __updateCredentialsResponse(params: {
    website: string;
    response: UpdateCredentialsResponse;
  }) {
    this.updateCredentialsResponses[params.website] = params.response;
  }

  async updateCredentials(params: {
    website: string;
    credentials: string;
  }): Promise<UpdateCredentialsResponse> {
    if (!this.updateCredentialsResponses[params.website])
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      };

    return this.updateCredentialsResponses[params.website];
  }

  async refreshSitemapAndIndexation(params: {
    websiteId: string;
  }): Promise<RefreshSitemapAndIndexationResponse> {
    return { error: false, body: { success: true } };
  }
}
