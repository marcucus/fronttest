import { IModule } from "../../interfaces/IModule";
import { WindowLocationService } from "../../services/WindowLocationService";
import { ApiWebsitesRepository } from "../../repositories/ApiWebsitesRepository";
import { ApiPagesRepository } from "../../repositories/ApiPagesRepository";
import { ApiReportsRepository } from "../../repositories/ApiReportsRepository";
import { ApiAuthRepository } from "../../repositories/ApiAuthRepository";
import { LocalstorageService } from "../../services/LocalstorageService";
import { ApiIndexationService } from "../../services/ApiIndexationService";
import { ApiService } from "../../services/ApiService";
import { AmplitudeAnalyticsService } from "../../services/AmplitudeAnalyticsService";

export class FullProductionRecipe implements IModule {
  build() {
    const LocalStorageService = new LocalstorageService();
    const apiService = new ApiService(LocalStorageService);

    const LocationService = new WindowLocationService();
    const AnalyticsService = new AmplitudeAnalyticsService();

    const PagesRepository = new ApiPagesRepository(apiService);
    const WebsitesRepository = new ApiWebsitesRepository(apiService);
    const IndexationService = new ApiIndexationService(apiService);
    const ReportsRepository = new ApiReportsRepository(apiService);
    const AuthRepository = new ApiAuthRepository(apiService);

    return {
      LocalStorageService,
      AuthRepository,
      AnalyticsService,
      ReportsRepository,
      PagesRepository,
      IndexationService,
      WebsitesRepository,
      LocationService,
    };
  }
}
