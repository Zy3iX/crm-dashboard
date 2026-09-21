"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const generateFallback = (): ClientType => {
  const obj: Record<string, string> = {};

  columns.forEach((col) => {
    if ("accessorKey" in col && typeof col.accessorKey === "string") {
      obj[col.accessorKey] = "Нет данных";
    }
  });

  return obj as unknown as ClientType;
};

export default function Page() {
  const [clientsData, setClientsData] = useState<ClientType[]>([
    generateFallback(),
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <section>
      <DataTable columns={columns} data={clientsData} isLoading={isLoading} />
    </section>
  );
}
