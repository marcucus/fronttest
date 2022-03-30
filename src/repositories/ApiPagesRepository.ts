import { PageEntity } from "interfaces.foudroyer.com";
import {
  FetchResponse,
  FilterParams,
  IPagesRepository,
} from "../interfaces/IPagesRepository";
import { ApiService } from "../services/ApiService";

export class ApiPagesRepository implements IPagesRepository {
  constructor(private apiService: ApiService) {}

  async fetch(params: FilterParams): Promise<FetchResponse> {
    const url = `/pages?website=${params.filter.website}&limit=${
      params.filter.limit || 100
    }${
      params.filter.indexation ? `&indexation=${params.filter.indexation}` : ""
    }${
      params.filter.search
        ? `&search=${encodeURIComponent(params.filter.search)}`
        : ""
    }${params.filter.offset ? `&offset=${params.filter.offset}` : ""}`;

    const response = await this.apiService.get<{
      total: number;
      pages: PageEntity[];
    }>(url);

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message };
    }

    return {
      error: false,
      body: response.data,
    };
  }
}
