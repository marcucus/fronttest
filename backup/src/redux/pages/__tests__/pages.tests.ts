import {
  ErrorEntity,
  IndexationType,
  PageEntity,
  WebsiteEntity,
} from "interfaces.foudroyer.com";
import { WebsiteActivated } from "../../../modules/seeds/WebsitesSeeds";
import { createStoreForTests } from "../../../utils/createStoreForTests";

describe.skip("pages tests suite", () => {
  it("as a user, i should be able to fetch pages of selected website", async () => {
    const { store, actions, di } = createStoreForTests();

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "https://www.sudoku.academy",
    };

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
    ];

    di.WebsitesRepository.store(website);
    di.PagesRepository._store(pages);

    di.LocationService.navigate("/pages/");

    await store.dispatch<any>(actions.websites.$fetch());
    await store.dispatch<any>(
      actions.websites.selectWebsite("https://www.sudoku.academy")
    );

    const promise = store.dispatch<any>(actions.pages.$fetch());

    expect(store.getState().pages.fetching).toEqual(true);

    await promise;

    expect(store.getState().pages.fetching).toEqual(false);

    expect(di.LocationService.getFullUrl()).toEqual("http://local.dev/pages/");
    expect(store.getState().pages.pages).toEqual(pages);
  });

  it("as a user, i should be able to fetch recently updated pages of selected website", async () => {
    const { store, actions, di } = createStoreForTests();

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "https://www.sudoku.academy",
    };

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-02"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
    ];

    di.WebsitesRepository.store(website);
    di.PagesRepository._store(pages);

    di.LocationService.navigate("/pages/");

    await store.dispatch<any>(actions.websites.$fetch());
    await store.dispatch<any>(
      actions.websites.selectWebsite("https://www.sudoku.academy")
    );

    const promise = store.dispatch<any>(actions.pages.$fetchRecentlyUpdated());

    expect(store.getState().pages.fetchingRecently).toEqual(true);

    await promise;

    expect(store.getState().pages.fetchingRecently).toEqual(false);

    expect(store.getState().pages.pagesRecentlyUpdated).toEqual([
      pages[1],
      pages[0],
    ]);
  });

  it("as a user, i should be able to filter the pages by name", async () => {
    const { store, actions, di } = createStoreForTests();

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "https://www.sudoku.academy",
    };

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
    ];

    di.WebsitesRepository.store(website);
    di.PagesRepository._store(pages);

    await store.dispatch<any>(actions.websites.$fetch());
    await store.dispatch<any>(
      actions.websites.selectWebsite("https://www.sudoku.academy")
    );

    await store.dispatch<any>(actions.pages.$fetch());

    store.dispatch<any>(actions.pages.filterByName({ name: "sitemap" }));

    await store.dispatch<any>(actions.pages.$fetch());

    expect(store.getState().pages.pages).toEqual([pages[1]]);
  });

  it("as a user, i should be able to send the urls filtered to indexation process", async () => {
    const { store, actions, di } = createStoreForTests();

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "https://www.sudoku.academy",
    };

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
    ];

    di.WebsitesRepository.store(website);
    di.PagesRepository._store(pages);

    await store.dispatch<any>(actions.websites.$fetch());
    await store.dispatch<any>(
      actions.websites.selectWebsite("https://www.sudoku.academy")
    );

    await store.dispatch<any>(
      actions.pages.filterByName({ name: "from-sitemap" })
    );

    await store.dispatch<any>(actions.pages.$fetch());
    await store.dispatch<any>(actions.pages.$index());

    expect(store.getState().pages.indexationProcess.fetching).toEqual(false);
    expect(store.getState().pages.indexationProcess.numberProcessed).toEqual(1);
    expect(store.getState().pages.indexationProcess.error).toEqual(null);
    expect(di.IndexationService.getAllRequestsNumber()).toEqual(1);
  });

  it("as a user, i should stop and show errors when index service respond with error", async () => {
    const { store, actions, di } = createStoreForTests();

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "https://www.sudoku.academy",
    };

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/index/quota-exceed/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_PROCESSED,
      },
    ];

    di.WebsitesRepository.store(website);
    di.PagesRepository._store(pages);

    await store.dispatch<any>(actions.websites.$fetch());
    await store.dispatch<any>(
      actions.websites.selectWebsite("https://www.sudoku.academy")
    );

    await store.dispatch<any>(actions.pages.$fetch());
    await store.dispatch<any>(actions.pages.$index());

    expect(store.getState().pages.indexationProcess.fetching).toEqual(false);
    expect(store.getState().pages.indexationProcess.numberProcessed).toEqual(2);
    expect(store.getState().pages.indexationProcess.error).toEqual(
      ErrorEntity.CREDENTIALS_NOT_FOUND
    );
    expect(di.IndexationService.getAllRequestsNumber()).toEqual(2);
  });

  describe("filter", () => {
    it("as a user, I should be able to filter by indexed pages", async () => {
      const { store, actions, di } = createStoreForTests();

      const url = "https://www.sudoku.academy";
      const website: WebsiteEntity = {
        already_activated: false,
        search_console_domain: "",

        image: url,
        sitemap: url,
        id: url,
      };

      di.WebsitesRepository.store(website);

      await store.dispatch<any>(actions.websites.$fetch());
      await store.dispatch<any>(actions.websites.selectWebsite(url));

      const pages: PageEntity[] = [
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_PROCESSED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
      ];

      di.PagesRepository._store(pages);

      await store.dispatch<any>(actions.pages.$fetch());

      expect(store.getState().pages.pages).toEqual(pages);

      await store.dispatch<any>(
        actions.pages.$toggleFilter({ type: IndexationType.INDEXED })
      );

      expect(store.getState().pages.pages).toEqual([pages[0]]);
      expect(store.getState().pages.filter.indexationState).toEqual(
        IndexationType.INDEXED
      );

      await store.dispatch<any>(
        actions.pages.$toggleFilter({ type: IndexationType.NOT_INDEXED })
      );

      expect(store.getState().pages.pages).toEqual([pages[2]]);
      expect(store.getState().pages.filter.indexationState).toEqual(
        IndexationType.NOT_INDEXED
      );

      await store.dispatch<any>(
        actions.pages.$toggleFilter({ type: IndexationType.NOT_PROCESSED })
      );

      expect(store.getState().pages.pages).toEqual([pages[1]]);
      expect(store.getState().pages.filter.indexationState).toEqual(
        IndexationType.NOT_PROCESSED
      );

      await store.dispatch<any>(actions.pages.$toggleFilter({ type: null }));

      expect(store.getState().pages.pages).toEqual(pages);
      expect(store.getState().pages.filter.indexationState).toEqual(null);
    });

    it("as a user, I should be able to open and close filter panel", async () => {
      const { store, actions } = createStoreForTests();

      expect(store.getState().pages.filter.panel.isOpen).toEqual(false);

      store.dispatch<any>(actions.pages.toggleFilterPanel());

      expect(store.getState().pages.filter.panel.isOpen).toEqual(true);

      store.dispatch<any>(actions.pages.toggleFilterPanel());

      expect(store.getState().pages.filter.panel.isOpen).toEqual(false);
    });

    it("as a user, I should be able to open and close page info", async () => {
      const { store, actions, di } = createStoreForTests();

      const url = "https://www.sudoku.academy";
      const website: WebsiteEntity = {
        already_activated: false,
        search_console_domain: "",

        image: url,
        sitemap: url,
        id: url,
      };

      di.WebsitesRepository.store(website);

      await store.dispatch<any>(actions.websites.$fetch());
      await store.dispatch<any>(actions.websites.selectWebsite(url));

      const pages: PageEntity[] = [
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_PROCESSED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
      ];

      di.PagesRepository._store(pages);

      await store.dispatch<any>(actions.pages.$fetch());

      store.dispatch<any>(actions.pages.togglePageInfo(pages[0]));

      expect(
        store.getState().pages.pagesWithInfoOpen.has(pages[0].url)
      ).toEqual(true);

      store.dispatch<any>(actions.pages.togglePageInfo(pages[0]));

      expect(
        store.getState().pages.pagesWithInfoOpen.has(pages[0].url)
      ).toEqual(false);
    });

    it("as a user, I should be able to open and close all page info", async () => {
      const { store, actions, di } = createStoreForTests();

      const url = "https://www.sudoku.academy";
      const website: WebsiteEntity = {
        already_activated: false,
        search_console_domain: "",
        image: url,
        sitemap: url,
        id: url,
      };

      di.WebsitesRepository.store(website);

      await store.dispatch<any>(actions.websites.$fetch());
      await store.dispatch<any>(actions.websites.selectWebsite(url));

      const pages: PageEntity[] = [
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_PROCESSED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
      ];

      di.PagesRepository._store(pages);

      await store.dispatch<any>(actions.pages.$fetch());

      store.dispatch<any>(actions.pages.toggleAllPageInfo());

      expect(store.getState().pages.pagesWithInfoOpen).toEqual(
        new Set(pages.map(({ url }) => url))
      );

      store.dispatch<any>(actions.pages.toggleAllPageInfo());

      expect(store.getState().pages.pagesWithInfoOpen).toEqual(new Set());
    });

    it("as a user, if show all info is set, the pages fetching should be open", async () => {
      const { store, actions, di } = createStoreForTests();

      const url = "https://www.sudoku.academy";
      const website: WebsiteEntity = {
        already_activated: false,
        search_console_domain: "",

        image: url,
        sitemap: url,
        id: url,
      };

      di.WebsitesRepository.store(website);

      await store.dispatch<any>(actions.websites.$fetch());
      await store.dispatch<any>(actions.websites.selectWebsite(url));

      const pages: PageEntity[] = [
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_PROCESSED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
      ];

      di.PagesRepository._store(pages);

      store.dispatch<any>(actions.pages.toggleAllPageInfo());

      await store.dispatch<any>(actions.pages.$fetch());

      expect(store.getState().pages.pagesWithInfoOpen).toEqual(
        new Set(pages.map(({ url }) => url))
      );
    });

    it("as a user, I should be able to update filter fields", async () => {
      const { store, actions, di } = createStoreForTests();

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "from",
          value: new Date("2021-01-01"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "to",
          value: new Date("2021-01-10"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({ type: "sort", value: "asc" })
      );

      expect(store.getState().pages.filter.panel.fields).toEqual({
        from: new Date("2021-01-01"),
        to: new Date("2021-01-10"),
        sort: "asc",
      });
    });

    it("as a user, I should be able to reset filters", async () => {
      const { store, actions, di } = createStoreForTests();

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "from",
          value: new Date("2021-01-01"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "to",
          value: new Date("2021-01-10"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({ type: "sort", value: "asc" })
      );

      store.dispatch<any>(actions.pages.filter.fields.reset());

      expect(store.getState().pages.filter.panel.fields).toEqual({
        from: null,
        to: null,
        sort: "desc",
      });
    });

    it("as a user, I should be able to save and apply filter", async () => {
      const { store, actions, di } = createStoreForTests();

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "from",
          value: new Date("2021-01-01"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "to",
          value: new Date("2021-01-10"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({ type: "sort", value: "asc" })
      );

      store.dispatch<any>(actions.pages.filter.fields.$apply());

      expect(store.getState().pages.filter.applied).toEqual(
        store.getState().pages.filter.panel.fields
      );
    });

    it("as a user, the pages should be filtering when filter is activated", async () => {
      const { store, actions, di } = createStoreForTests();

      const url = "https://www.sudoku.academy";
      const website: WebsiteEntity = {
        already_activated: false,
        search_console_domain: "",

        image: url,
        sitemap: url,
        id: url,
      };

      di.WebsitesRepository.store(website);

      await store.dispatch<any>(actions.websites.$fetch());
      await store.dispatch<any>(actions.websites.selectWebsite(url));

      const pages: PageEntity[] = [
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-04"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-02"),
          indexation_state: IndexationType.NOT_PROCESSED,
        },
        {
          fk_website_id: website.id,
          url: "https://www.sudoku.academy/not-indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
      ];

      di.PagesRepository._store(pages);

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "from",
          value: new Date("2021-01-02"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "to",
          value: new Date("2021-01-10"),
        })
      );

      store.dispatch<any>(
        actions.pages.filter.fields.update({ type: "sort", value: "desc" })
      );

      store.dispatch<any>(actions.pages.filter.fields.apply());

      await store.dispatch<any>(actions.pages.$fetch());

      expect(store.getState().pages.pages).toEqual([pages[0], pages[1]]);
    });
  });

  describe("Pagination test suite", () => {
    it("I should be able to paginate", async () => {
      const { store, actions, di } = createStoreForTests();

      di.WebsitesRepository.__checkResponse({
        website: WebsiteActivated.id,
        response: {
          isSitemapValid: true,
          isCredentialsValid: true,
        },
      });

      await store.dispatch<any>(actions.websites.$fetch());
      await store.dispatch<any>(
        actions.websites.$selectWebsite(WebsiteActivated.id)
      );

      const pages: PageEntity[] = [
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-04"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-02"),
          indexation_state: IndexationType.NOT_PROCESSED,
        },
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/not-indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
      ];

      di.PagesRepository._store(pages);

      expect(store.getState().pages.pagination.limit).toEqual(100);
      expect(store.getState().pages.pagination.page).toEqual(1);

      store.dispatch<any>(
        actions.pages.pagination.limit.update({
          value: 1,
        })
      );

      expect(store.getState().pages.pagination.limit).toEqual(1);

      await store.dispatch<any>(actions.pages.$fetch());

      expect(store.getState().pages.pages).toEqual([pages[0]]);

      await store.dispatch<any>(actions.pages.pagination.$next());

      expect(store.getState().pages.pagination.page).toEqual(2);
      expect(store.getState().pages.pages).toEqual([pages[1]]);

      await store.dispatch<any>(actions.pages.pagination.$next());

      expect(store.getState().pages.pagination.page).toEqual(3);
      expect(store.getState().pages.pages).toEqual([pages[2]]);

      await store.dispatch<any>(actions.pages.pagination.$next());

      expect(store.getState().pages.pages).toEqual([pages[2]]);
      expect(store.getState().pages.pagination.page).toEqual(3);

      await store.dispatch<any>(actions.pages.pagination.$previous());

      expect(store.getState().pages.pagination.page).toEqual(2);
      expect(store.getState().pages.pages).toEqual([pages[1]]);

      await store.dispatch<any>(actions.pages.pagination.$previous());

      expect(store.getState().pages.pagination.page).toEqual(1);
      expect(store.getState().pages.pages).toEqual([pages[0]]);

      await store.dispatch<any>(actions.pages.pagination.$previous());

      expect(store.getState().pages.pagination.page).toEqual(1);
      expect(store.getState().pages.pages).toEqual([pages[0]]);
    });

    it("When I apply filter, the pagination should be reset", async () => {
      const { store, actions, di } = createStoreForTests();

      di.WebsitesRepository.__checkResponse({
        website: WebsiteActivated.id,
        response: {
          isSitemapValid: true,
          isCredentialsValid: true,
        },
      });

      await store.dispatch<any>(actions.websites.$fetch());
      await store.dispatch<any>(
        actions.websites.$selectWebsite(WebsiteActivated.id)
      );

      const pages: PageEntity[] = [
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-04"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-02"),
          indexation_state: IndexationType.NOT_PROCESSED,
        },
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/not-indexed/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
      ];

      di.PagesRepository._store(pages);

      expect(store.getState().pages.pagination.limit).toEqual(100);
      expect(store.getState().pages.pagination.page).toEqual(1);

      store.dispatch<any>(
        actions.pages.pagination.limit.update({
          value: 1,
        })
      );

      expect(store.getState().pages.pagination.limit).toEqual(1);

      await store.dispatch<any>(actions.pages.$fetch());

      expect(store.getState().pages.pages).toEqual([pages[0]]);

      await store.dispatch<any>(actions.pages.pagination.$next());

      expect(store.getState().pages.pagination.page).toEqual(2);
      expect(store.getState().pages.pages).toEqual([pages[1]]);

      await store.dispatch<any>(
        actions.pages.filter.fields.update({
          type: "sort",
          value: "desc",
        })
      );

      await store.dispatch<any>(actions.pages.filter.fields.$apply());

      expect(store.getState().pages.pagination.page).toEqual(1);
    });
  });
});
