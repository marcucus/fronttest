import { ErrorEntity, UserEntity } from "interfaces.foudroyer.com";
import { InternalErrorEntity } from "../entities/InternalErrorEntity";
import {
  IAuthRepository,
  AuthenticateWithGoogleResponse,
  GetUserInfoResponse,
} from "../interfaces/IAuthRepository";
import { ApiService } from "../services/ApiService";

export class ApiAuthRepository implements IAuthRepository {
  constructor(private apiService: ApiService) {}

  private getCallbackUrl(): string {
    return window.location.origin + "/authentication/google/callback";
  }

  private openBrowserAndGetCodeFromGoogle(
    url: string
  ): Promise<
    { error: false; body: string } | { error: true; code: InternalErrorEntity }
  > {
    return new Promise(async (resolve) => {
      const browser = window.open(url);

      const interval = setInterval(() => {
        if (!browser || !browser.window) {
          clearInterval(interval);
          return resolve({
            error: true,
            code: InternalErrorEntity.GOOGLE_BROWSER_CLOSED,
          });
        }

        try {
          const href = browser?.window.location.href;
          const url = new URL(href);
          const code = url.searchParams.get("code") as string;
          clearInterval(interval);
          browser.close();
          return resolve({ error: false, body: code });
        } catch (error) {}
      }, 500);
    });
  }

  private async getGoogleAuthenticationUrl(): Promise<
    { error: true; code: ErrorEntity } | { error: false; body: string }
  > {
    const response = await this.apiService.get<{ url: string }>(
      "/auth/google/url?callback=" + this.getCallbackUrl()
    );

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message };
    }

    return { error: false, body: response.data.url };
  }

  private async postAuthenticationCode(
    code: string,
    callbackUrl: string
  ): Promise<
    | {
        error: true;
        code: ErrorEntity;
      }
    | {
        error: false;
        body: string;
      }
  > {
    const response = await this.apiService.post<{ access_token: string }>(
      "/auth/google/callback",
      {
        code: code || "bad-code",
        callbackUrl,
      }
    );

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message };
    }

    return { error: false, body: response.data.access_token };
  }

  async getUserInfo(): Promise<GetUserInfoResponse> {
    const response = await this.apiService.get<UserEntity>("/auth/profile");

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      };

    return { error: false, body: response.data };
  }

  async authenticateWithGoogle(): Promise<AuthenticateWithGoogleResponse> {
    const callbackUrl = this.getCallbackUrl();
    const response = await this.getGoogleAuthenticationUrl();

    if (response.error === true) {
      return {
        error: true,
        code: response.code,
      };
    }

    const code = await this.openBrowserAndGetCodeFromGoogle(response.body);

    if (code.error === true) {
      return { error: true, code: code.code };
    }

    const accessToken = await this.postAuthenticationCode(
      code.body,
      callbackUrl
    );

    if (accessToken.error === true) {
      return { error: true, code: accessToken.code };
    }

    return { error: false, body: { token: accessToken.body } };
  }
}
