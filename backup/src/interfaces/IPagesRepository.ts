import { PageEntity } from "interfaces.foudroyer.com";
import { IRepositoryResponse } from "./IApiResponse";

export type FilterParams = {
  filter: {
    website: string;
    indexation: PageEntity["indexation_state"] | null;
    from: Date | null;
    to: Date | null;
    sort: "asc" | "desc";
    offset: number;
    limit: number;
    search?: string | null;
  };
};

export type FetchResponse = IRepositoryResponse<{
  pages: PageEntity[];
  total: number;
}>;
export interface IPagesRepository {
  fetch(params: FilterParams): Promise<FetchResponse>;
}
