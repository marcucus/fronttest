import axios from "axios";
import { IApiResponse } from "../interfaces/IApiResponse";
import { ILocalStorageService } from "../interfaces/ILocalStorageService";

const PRODUCTION_ENDPOINT =
  "https://tvk7fc5bna.execute-api.eu-west-1.amazonaws.com/v1";
const DEVELOPMENT_ENDPOINT = "http://localhost:3333";

export class ApiService {
  constructor(private localStorageService: ILocalStorageService) {
    axios.defaults.validateStatus = function (status) {
      return status <= 400;
    };
  }

  private endpoint: string =
    process.env.NODE_ENV === "production"
      ? PRODUCTION_ENDPOINT
      : DEVELOPMENT_ENDPOINT;

  get<T>(url: string) {
    const headers = {
      Authorization: "Bearer " + this.localStorageService.getToken(),
    };

    return axios.get<IApiResponse<T>>(`${this.endpoint}${url}`, {
      headers,
    });
  }

  post<T>(url: string, data: any) {
    return axios.post<IApiResponse<T>>(`${this.endpoint}${url}`, data, {
      headers: {
        Authorization: "Bearer " + this.localStorageService.getToken(),
      },
    });
  }

  put<T>(url: string, data: any) {
    return axios.put<IApiResponse<T>>(`${this.endpoint}${url}`, data, {
      headers: {
        Authorization: "Bearer " + this.localStorageService.getToken(),
      },
    });
  }
}
