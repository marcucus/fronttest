import { IModule } from "../../interfaces/IModule";
import { WindowLocationService } from "../../services/WindowLocationService";
import { InMemoryIndexationService } from "../../services/InMemoryIndexationService";
import { InMemoryWebsitesRepository } from "../../repositories/InMemoryWebsitesRepository";
import { InMemoryPagesRepository } from "../../repositories/InMemoryPagesRepository";
import { InMemoryReportsRepository } from "../../repositories/InMemoryReportsRepository";
import { InMemoryAuthRepository } from "../../repositories/InMemoryAuthRepository";
import { InMemoryLocalStorageService } from "../../services/InMemoryLocalStorageService";
import { InMemoryAnalyticsService } from "../../services/InMemoryAnalyticsService";
import { IndexationType } from "interfaces.foudroyer.com";

export class FullLocalRecipe implements IModule {
  build() {
    const LocationService = new WindowLocationService();
    const PagesRepository = new InMemoryPagesRepository();
    const WebsitesRepository = new InMemoryWebsitesRepository();
    const IndexationService = new InMemoryIndexationService();
    const ReportsRepository = new InMemoryReportsRepository();
    const AuthRepository = new InMemoryAuthRepository();
    const LocalStorageService = new InMemoryLocalStorageService();
    const AnalyticsService = new InMemoryAnalyticsService();

    AuthRepository.store([
      {
        id: "1",
        email: "hello@gmail.com",
      },
    ]);

    WebsitesRepository.store({
      id: "https://www.sudoku.academy",
      image: "https://www.sudoku.academy/favicon.png",
      already_activated: false,
      search_console_domain: "sc-domain:sudoku.academy",
      sitemap: "https://www.sudoku.academy/sitemap.xml",
    });

    WebsitesRepository.__checkResponse({
      website: "https://www.sudoku.academy",
      response: {
        isCredentialsValid: true,
        isSitemapValid: true,
      },
    });

    WebsitesRepository.store({
      id: "https://www.foudroyer.com",
      image: "https://www.foudroyer.com/favicon.png",
      already_activated: false,
      search_console_domain: "sc-domain:foudroyer.com",
      sitemap: "https://www.foudroyer.com/sitemap.xml",
    });

    WebsitesRepository.store({
      id: "https://www.temple-du-haiku.fr",
      image: "https://www.temple-du-haiku.fr/manifest/512x512.png",
      search_console_domain: "sc-domain:temple-du-haiku.fr",
      already_activated: false,
      sitemap: "https://www.temple-du-haiku.fr/sitemap.xml",
    });

    WebsitesRepository.store({
      id: "https://www.no-sitemap.fr",
      image: "https://cdn-icons-png.flaticon.com/512/228/228924.png",
      search_console_domain: "sc-domain:temple-du-haiku.fr",
      already_activated: true,
      sitemap: null,
    });

    WebsitesRepository.store({
      id: "https://www.no-credentials.fr",
      image: "https://cdn-icons-png.flaticon.com/512/228/228924.png",
      search_console_domain: "sc-domain:temple-du-haiku.fr",
      already_activated: true,
      sitemap: "sitemap",
    });

    WebsitesRepository.__checkResponse({
      website: "https://www.no-credentials.fr",
      response: {
        isCredentialsValid: false,
        isSitemapValid: true,
      },
    });

    WebsitesRepository.__checkResponse({
      website: "https://www.no-sitemap.fr",
      response: {
        isCredentialsValid: true,
        isSitemapValid: false,
      },
    });

    WebsitesRepository.__updateCredentialsResponse({
      website: "https://www.no-credentials.fr",
      response: {
        error: false,
        body: null,
      },
    });

    WebsitesRepository.storeFromGoogle({
      id: "https://chanoyu.fr",
      image:
        "https://chanoyu.fr/favicon.svg?v=89212616ca37792aab14474428d9fd10",
      search_console_domain: "sc-domain:chanoyu.fr",
      already_activated: false,
      sitemap: "https://chanoyu.fr/sitemap.xml",
    });

    PagesRepository._store([
      {
        fk_website_id: "https://www.sudoku.academy",
        url: "https://www.sudoku.academy",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_INDEXED,
      },
      {
        fk_website_id: "https://www.sudoku.academy/fr/",
        url: "https://www.sudoku.academy/fr/",
        updated_at: new Date("2021-12-02"),
        indexation_state: IndexationType.NOT_INDEXED,
      },
      {
        fk_website_id: "https://www.sudoku.academy/fr/apprendre/",
        url: "https://www.sudoku.academy/fr/apprendre/",
        updated_at: new Date("2021-12-03"),
        indexation_state: IndexationType.INDEXED,
      },
      {
        fk_website_id: "https://www.sudoku.academy/de/",
        url: "https://www.sudoku.academy/de/",
        updated_at: new Date("2021-12-03"),
        indexation_state: IndexationType.INDEXED,
      },
      {
        fk_website_id: "https://www.sudoku.academy/pt/",
        url: "https://www.sudoku.academy/pt/",
        updated_at: new Date("2021-12-03"),
        indexation_state: IndexationType.INDEXED,
      },
      {
        fk_website_id: "https://www.sudoku.academy/fr/apprendre/les-bases/",
        url: "https://www.sudoku.academy/fr/apprendre/les-bases/",
        updated_at: new Date("2021-12-04"),
        indexation_state: IndexationType.INDEXED,
      },
    ]);

    ReportsRepository.store([
      {
        type: IndexationType.INDEXED,
        percentage: 87,
        value: 276,
      },
      {
        type: IndexationType.NOT_INDEXED,
        percentage: 13,
        value: 100,
      },
    ]);

    return {
      LocalStorageService,
      AuthRepository,
      ReportsRepository,
      PagesRepository,
      IndexationService,
      WebsitesRepository,
      AnalyticsService,
      LocationService,
    };
  }
}
