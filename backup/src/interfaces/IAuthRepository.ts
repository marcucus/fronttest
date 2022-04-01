import { UserEntity } from "interfaces.foudroyer.com";
import { IRepositoryResponse } from "./IApiResponse";

export type GetUserInfoResponse = IRepositoryResponse<UserEntity>;

export type AuthenticateWithGoogleResponse = IRepositoryResponse<{
  token: string;
}>;

export interface IAuthRepository {
  authenticateWithGoogle(): Promise<AuthenticateWithGoogleResponse>;
  getUserInfo(): Promise<GetUserInfoResponse>;
}
