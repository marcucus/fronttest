import { WebsiteEntity } from "interfaces.foudroyer.com";

export const WebsiteNotActivated: WebsiteEntity = {
  image: "https://already_activated:false",
  sitemap: "https://already_activated:false",
  search_console_domain: "sc-domain:already_activated:false",
  id: "https://already_activated:false",
  already_activated: false,
};

export const WebsiteActivated: WebsiteEntity = {
  image: "https://already_activated:true",
  sitemap: "https://already_activated:true",
  search_console_domain: "sc-domain:already_activated:true",
  id: "https://already_activated:true",
  already_activated: false,
};

export const WebsiteNoSitemap: WebsiteEntity = {
  image: "https://sitemap:false",
  sitemap: null,
  search_console_domain: "sc-domain:sitemap:false",
  id: "sitemap:false",
  already_activated: true,
};
