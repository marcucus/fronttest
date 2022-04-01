import { navigate } from "@reach/router";
import { ILocationService } from "../interfaces/ILocationService";

export class WindowLocationService implements ILocationService {
  navigate(to: string, state = {}) {
    navigate(to, state);
  }

  getFullUrl() {
    return window.location.href;
  }

  getOrigin() {
    return window.location.origin;
  }

  getPathname() {
    return window.location.pathname;
  }
}
