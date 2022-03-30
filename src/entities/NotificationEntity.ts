import { ErrorEntity } from "interfaces.foudroyer.com";
import { InternalErrorEntity } from "./InternalErrorEntity";

export enum NotificationMessageEntity {
  WEBSITES_CREATE_SUCCESS = "websites/success/create",
  SYNC_SUCCESS = "websites/success/sync",
  WEBSITES_UPDATE_SUCCESS = "websites/success/update",
  WEBSITES_SITEMAP_UPDATE_SUCCESS = "websites/sitemap/update/empty",
  WEBSITES_NOT_SELECTED = "websites/not-selected",
  WEBSITES_SITEMAP_UPDATE_EMPTY = "websites/sitemap/update/empty",
  WEBSITES_CREDENTIALS_UPDATE_EMPTY = "websites/credentials/update/empty",
  INDEXATION_SUCCESS = "indexation/success",
}

export type NotificationEntity = {
  type: "info" | "success" | "error" | "warning";
  message: ErrorEntity | InternalErrorEntity | NotificationMessageEntity;
  id: number;
  timeout?: number;
  onValidate?: Function;
};
