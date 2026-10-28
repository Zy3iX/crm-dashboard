"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getClients(): Promise<ClientType[]> {
    const response = await fetch("/api/clients");

    if (!response.ok) {
        throw new Error(`Could not load clients (${response.status}).`);
    }

    const clients: unknown = await response.json();
    if (!Array.isArray(clients)) {
        throw new Error("The clients response was not a list.");
    }

    return clients as ClientType[];
}

export function DataTableWrapper() {
    const { data, error, isError, isPending, refetch } = useQuery({
        queryKey: ["clients"],
        queryFn: getClients,
    });

    if (isError && data === undefined) {
        return (
            <section className="rounded-md border p-6" role="alert">
                <h2 className="font-semibold">Unable to load clients</h2>
                <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
                <Button
                    className="mt-4"
                    onClick={() => void refetch()}
                    disabled={isPending}
                >
                    Try again
                </Button>
            </section>
        );
    }

    return (
        <section className="space-y-4">
            {isError && (
                <div
                    className="flex items-center justify-between gap-4 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm"
                    role="alert"
                >
                    <span>Could not refresh clients. Showing the last loaded data.</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void refetch()}
                        disabled={isPending}
                    >
                        Retry
                    </Button>
                </div>
            )}
            <DataTable columns={columns} data={data ?? []} isLoading={isPending} />
        </section>
    );
}