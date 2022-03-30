import { IModule } from "../interfaces/IModule";
import { InMemoryAuthRepository } from "../repositories/InMemoryAuthRepository";
import { InMemoryPagesRepository } from "../repositories/InMemoryPagesRepository";
import { InMemoryReportsRepository } from "../repositories/InMemoryReportsRepository";
import { InMemoryWebsitesRepository } from "../repositories/InMemoryWebsitesRepository";
import { InMemoryAnalyticsService } from "../services/InMemoryAnalyticsService";
import { InMemoryIndexationService } from "../services/InMemoryIndexationService";
import { InMemoryLocalStorageService } from "../services/InMemoryLocalStorageService";
import { InMemoryLocationService } from "../services/InMemoryLocationService";
import {
  WebsiteActivated,
  WebsiteNoSitemap,
  WebsiteNotActivated,
} from "./seeds/WebsitesSeeds";

export class TestModule implements IModule {
  build() {
    const LocationService = new InMemoryLocationService();
    const WebsitesRepository = new InMemoryWebsitesRepository();
    const PagesRepository = new InMemoryPagesRepository();
    const IndexationService = new InMemoryIndexationService();
    const ReportsRepository = new InMemoryReportsRepository();
    const AuthRepository = new InMemoryAuthRepository();
    const LocalStorageService = new InMemoryLocalStorageService();
    const AnalyticsService = new InMemoryAnalyticsService();

    WebsitesRepository.store(WebsiteActivated);
    WebsitesRepository.store(WebsiteNoSitemap);
    WebsitesRepository.storeFromGoogle(WebsiteNotActivated);

    return {
      LocalStorageService,
      AuthRepository,
      AnalyticsService,
      ReportsRepository,
      IndexationService,
      PagesRepository,
      WebsitesRepository,
      LocationService,
    };
  }
}
