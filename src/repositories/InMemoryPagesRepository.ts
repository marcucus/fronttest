import { PageEntity } from "interfaces.foudroyer.com";
import { uniqWith } from "ramda";
import {
  FetchResponse,
  FilterParams,
  IPagesRepository,
} from "../interfaces/IPagesRepository";

export class InMemoryPagesRepository implements IPagesRepository {
  private pages: PageEntity[] = [];

  async _store(pagesToStore: PageEntity[]): Promise<{ success: boolean }> {
    this.pages = uniqWith<PageEntity, PageEntity>((a, b) => a.url === b.url)([
      ...this.pages,
      ...pagesToStore,
    ]);

    return { success: true };
  }

  async fetch(params: FilterParams): Promise<FetchResponse> {
    const pages = this.pages
      .filter(({ indexation_state, updated_at, url }) => {
        if (params.filter.search && !url.includes(params.filter.search))
          return false;

        if (
          params.filter.indexation &&
          params.filter.indexation !== indexation_state
        ) {
          return false;
        }

        if (params.filter.from) {
          if (!updated_at) return false;
          if (params.filter.from > updated_at) return false;
        }

        if (params.filter.to) {
          if (!updated_at) return false;
          if (params.filter.to < updated_at) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (params.filter.sort === "asc")
          return (
            (a.updated_at?.valueOf() || 0) - (b.updated_at?.valueOf() || 0)
          );

        return (b.updated_at?.valueOf() || 0) - (a.updated_at?.valueOf() || 0);
      });

    return {
      error: false,
      body: {
        pages: pages.slice(
          (params.filter.offset - 1) * params.filter.limit,
          params.filter.offset * params.filter.limit
        ),
        total: pages.length,
      },
    };
  }
}
