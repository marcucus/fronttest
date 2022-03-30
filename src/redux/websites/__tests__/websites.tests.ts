import { ErrorEntity } from "interfaces.foudroyer.com";
import { NotificationMessageEntity } from "../../../entities/NotificationEntity";
import {
  WebsiteActivated,
  WebsiteNoSitemap,
  WebsiteNotActivated,
} from "../../../modules/seeds/WebsitesSeeds";
import { createStoreForTests } from "../../../utils/createStoreForTests";

describe.skip("websites tests suite", () => {
  it("as a user, i would like to fetch websites", async () => {
    const { store, actions } = createStoreForTests();

    const website = WebsiteActivated;

    await store.dispatch<any>(actions.websites.$fetch());

    expect(store.getState().websites.entities.includes(website.id)).toEqual(
      true
    );
    expect(store.getState().websites.map.get(website.id)).toEqual(website);
  });

  it("as a user, i should be able to fetch google domains", async () => {
    const { store, actions } = createStoreForTests();

    const website = WebsiteNotActivated;

    await store.dispatch<any>(actions.websites.$fetchAll());

    expect(
      store.getState().websites.google.find(({ id }) => website.id === id)
    ).toBeTruthy();
  });

  it("as a user, i would like to activate a website", async () => {
    const { store, actions } = createStoreForTests();

    const website = WebsiteNotActivated;

    await store.dispatch<any>(actions.websites.$fetchAll());

    const promise = store.dispatch<any>(
      actions.websites.$activate(website.search_console_domain as string)
    );

    expect(store.getState().websites.fetching).toEqual(true);

    await promise;

    expect(store.getState().websites.fetching).toEqual(false);
    expect(store.getState().websites.map.get(website.id)).toBeTruthy();
    expect(
      store.getState().websites.map.get(website.id)?.already_activated
    ).toEqual(true);
  });

  describe("sitemap flow", () => {
    it("should return an error if I try to submit an empty sitemap", async () => {
      const { store, actions, di } = createStoreForTests();

      const website = WebsiteNoSitemap;

      di.WebsitesRepository.__checkResponse({
        website: website.id,
        response: {
          credentials: "not-ok",
          sitemap: "not-ok",
        },
      });

      await store.dispatch<any>(actions.websites.$fetchAll());
      await store.dispatch<any>(actions.websites.$selectWebsite(website.id));
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true);

      const sitemap = "";

      store.dispatch<any>(actions.websites.updateSitemap({ value: sitemap }));

      await store.dispatch<any>(actions.websites.$saveSitemap());

      expect(store.getState().websites.addSitemap.isFetching).toEqual(false);
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true);
      expect(store.getState().notifcations.notifications[0].message).toEqual(
        NotificationMessageEntity.WEBSITES_SITEMAP_UPDATE_EMPTY
      );
    });

    it("should return an error if the server respond with an error", async () => {
      const { store, actions, di } = createStoreForTests();

      const website = WebsiteNoSitemap;

      di.WebsitesRepository.__checkResponse({
        website: website.id,
        response: {
          credentials: "not-ok",
          sitemap: "not-ok",
        },
      });

      di.WebsitesRepository.__updateSitemapResponse({
        website: website.id,
        response: {
          error: true,
          code: ErrorEntity.SITEMAP_INVALID,
        },
      });

      await store.dispatch<any>(actions.websites.$fetchAll());
      await store.dispatch<any>(actions.websites.$selectWebsite(website.id));
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true);

      const sitemap = "bad-sitemap.xml";

      store.dispatch<any>(actions.websites.updateSitemap({ value: sitemap }));

      await store.dispatch<any>(actions.websites.$saveSitemap());

      expect(store.getState().websites.addSitemap.isFetching).toEqual(false);
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true);
      expect(store.getState().notifcations.notifications[0].message).toEqual(
        ErrorEntity.SITEMAP_INVALID
      );
    });

    it("as a user, i should be able to submit the sitemap", async () => {
      const { store, actions, di } = createStoreForTests();

      const website = WebsiteNoSitemap;

      di.WebsitesRepository.__checkResponse({
        website: website.id,
        response: {
          credentials: "not-ok",
          sitemap: "not-ok",
        },
      });

      await store.dispatch<any>(actions.websites.$fetchAll());

      await store.dispatch<any>(actions.websites.$selectWebsite(website.id));

      expect(store.getState().websites.addSitemap.isOpen).toEqual(true);

      const sitemap = "https://www.sudoku.academy/sitemap.xml";

      store.dispatch<any>(actions.websites.updateSitemap({ value: sitemap }));

      const promise = store.dispatch<any>(actions.websites.$saveSitemap());

      expect(store.getState().websites.addSitemap.isFetching).toEqual(true);

      await promise;

      expect(store.getState().websites.map.get(website.id)?.sitemap).toEqual(
        sitemap
      );
      expect(store.getState().websites.addSitemap.value).toEqual(null);
      expect(store.getState().websites.addSitemap.isOpen).toEqual(false);
      expect(store.getState().websites.addSitemap.isFetching).toEqual(false);
    });
  });

  describe("credentials flow", () => {
    it("when I select a website, if the server says that credentials are not ok (not set, or not valid), then show the modal, if not, then not open", async () => {
      const { store, actions, di } = createStoreForTests();

      di.WebsitesRepository.__checkResponse({
        website: WebsiteNoSitemap.id,
        response: {
          credentials: "not-ok",
          sitemap: "not-ok",
        },
      });

      di.WebsitesRepository.__checkResponse({
        website: WebsiteActivated.id,
        response: {
          credentials: "ok",
          sitemap: "ok",
        },
      });

      await store.dispatch<any>(actions.websites.$fetchAll());
      await store.dispatch<any>(
        actions.websites.$selectWebsite(WebsiteNoSitemap.id)
      );

      expect(store.getState().websites.addCredentials.isOpen).toEqual(true);

      await store.dispatch<any>(
        actions.websites.$selectWebsite(WebsiteActivated.id)
      );

      expect(store.getState().websites.addCredentials.isOpen).toEqual(false);
    });

    it("should be able to update the credentials and close modal if the servers says it's good", async () => {
      const { store, actions, di } = createStoreForTests();

      di.WebsitesRepository.__checkResponse({
        website: WebsiteNoSitemap.id,
        response: {
          credentials: "not-ok",
          sitemap: "not-ok",
        },
      });
      di.WebsitesRepository.__updateCredentialsResponse({
        website: WebsiteNoSitemap.id,
        response: {
          error: false,
          body: null,
        },
      });

      await store.dispatch<any>(actions.websites.$fetchAll());
      await store.dispatch<any>(
        actions.websites.$selectWebsite(WebsiteNoSitemap.id)
      );

      expect(store.getState().websites.addCredentials.isOpen).toEqual(true);

      store.dispatch<any>(
        actions.websites.updateCredentials({ value: "the keys" })
      );

      const promise = store.dispatch<any>(actions.websites.$saveCredentials());

      expect(store.getState().websites.addCredentials.isFetching).toEqual(true);

      await promise;

      expect(store.getState().websites.addCredentials.isFetching).toEqual(
        false
      );
      expect(store.getState().websites.addCredentials.isOpen).toEqual(false);
      expect(store.getState().websites.addCredentials.value).toEqual(null);
    });

    it("should show an error if the update credentials failed", async () => {
      const { store, actions, di } = createStoreForTests();

      di.WebsitesRepository.__checkResponse({
        website: WebsiteNoSitemap.id,
        response: {
          credentials: "not-ok",
          sitemap: "not-ok",
        },
      });
      di.WebsitesRepository.__updateCredentialsResponse({
        website: WebsiteNoSitemap.id,
        response: {
          error: true,
          code: ErrorEntity.GOOGLE_UNKNOWN_ERROR,
        },
      });

      await store.dispatch<any>(actions.websites.$fetchAll());
      await store.dispatch<any>(
        actions.websites.$selectWebsite(WebsiteNoSitemap.id)
      );

      expect(store.getState().websites.addCredentials.isOpen).toEqual(true);

      store.dispatch<any>(
        actions.websites.updateCredentials({ value: "the keys" })
      );

      await store.dispatch<any>(actions.websites.$saveCredentials());

      expect(store.getState().websites.addCredentials.isFetching).toEqual(
        false
      );
      expect(store.getState().websites.addCredentials.isOpen).toEqual(true);
      expect(store.getState().notifcations.notifications[0].message).toEqual(
        ErrorEntity.GOOGLE_UNKNOWN_ERROR
      );
    });
  });
});
