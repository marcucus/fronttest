import { ErrorEntity, UserEntity } from "interfaces.foudroyer.com";
import {
  IAuthRepository,
  AuthenticateWithGoogleResponse,
  GetUserInfoResponse,
} from "../interfaces/IAuthRepository";

export class InMemoryAuthRepository implements IAuthRepository {
  private users: UserEntity[] = [];

  async store(user: UserEntity[]) {
    this.users.push(...user);
  }

  async authenticateWithGoogle(): Promise<AuthenticateWithGoogleResponse> {
    const user = this.users[0];

    if (!user)
      return { error: true, code: ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND };

    return { error: false, body: { token: "access-token" } };
  }

  async getUserInfo(): Promise<GetUserInfoResponse> {
    const user = this.users[0];

    if (!user) return { error: true, code: ErrorEntity.USER_NOT_AUTHENTICATED };

    return { error: false, body: user };
  }
}
