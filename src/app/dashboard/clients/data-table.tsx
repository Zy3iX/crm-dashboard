"use client";

import { useSyncExternalStore } from "react";
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";

const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  isLoading: boolean;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData>) {
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot,
  );
  const table = useTable({
    features,
    data,
    columns,
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="border-r bg-accent" key={header.id}>
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(10)].map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((col, j) => (
                    <TableCell key={`skeleton-cell-${i}-${j}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          type="button"
          className={buttonVariants({ variant: "outline", size: "sm" })}
          onClick={() => table.previousPage()}
          disabled={
            hasHydrated && (isLoading || !table.getCanPreviousPage())
          }
        >
          Previous
        </button>
        <button
          type="button"
          className={buttonVariants({ variant: "outline", size: "sm" })}
          onClick={() => table.nextPage()}
          disabled={hasHydrated && (isLoading || !table.getCanNextPage())}
        >
          Next
        </button>
      </div>
    </>
  );
}
