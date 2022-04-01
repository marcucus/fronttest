import { ILocationService } from "./ILocationService";
import { IWebsitesRepository } from "./IWebsitesRepository";
import { IPagesRepository } from "./IPagesRepository";
import { IIndexationService } from "./IIndexationService";
import { IReportsRepository } from "./IReportsRepository";
import { IAuthRepository } from "./IAuthRepository";
import { ILocalStorageService } from "./ILocalStorageService";
import { IAnalyticsService } from "./IAnalyticsService";

export type Modules = {
  LocationService: ILocationService;
  WebsitesRepository: IWebsitesRepository;
  PagesRepository: IPagesRepository;
  IndexationService: IIndexationService;
  ReportsRepository: IReportsRepository;
  AnalyticsService: IAnalyticsService;
  AuthRepository: IAuthRepository;
  LocalStorageService: ILocalStorageService;
};

export interface IModule {
  build(): Modules;
}
