export type ClientFilters = {
  search: string;
  status: ClientType["status"] | "all";
  source: ClientType["source"] | "all";
};

export const queryKeys = {
  clients: {
    all: ["clients"] as const,
    list: (filters: ClientFilters) => ["clients", "list", filters] as const,
    detail: (clientId: string) => ["clients", "detail", clientId] as const,
  },
  dashboard: {
    summary: ["dashboard", "summary"] as const,
  },
};
