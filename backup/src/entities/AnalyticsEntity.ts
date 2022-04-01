type Base = {
  label?: string;
  value?: string;
  data?: { [x: string]: string | number | boolean };
};

type PagesEvents = {
  category: "pages";
  action: "search";
  data: {
    query: string;
  };
};

export type AuthenticationAnalyticsEntity = Base & {
  category: "authentication";
  action: "logout" | "login";
};

export type ErrorAnalyticsEntity = Base & {
  category: "error";
  action: "login";
  message: string;
};

export type AnalyticsEntity =
  | PagesEvents
  | AuthenticationAnalyticsEntity
  | ErrorAnalyticsEntity;
