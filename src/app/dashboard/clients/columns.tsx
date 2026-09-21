"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";

const columnHelper = createColumnHelper<DataTableFeatures, ClientType>();

export const columns = columnHelper.columns([
  columnHelper.accessor("firstName", {
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    header: "LastName",
  }),
  columnHelper.accessor("phone", {
    header: "Phone number",
  }),
  columnHelper.accessor("preferredLanguage", {
    header: "Preferred Language",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("activeManager", {
    header: "Manager",
  }),
]);
