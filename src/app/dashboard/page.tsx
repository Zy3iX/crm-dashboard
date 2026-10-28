"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartAreaLinear } from "./chart-area-linear";

type DashboardSummary = {
  totalClients: number;
  newThisWeek: number;
  newThisMonth: number;
  qualifiedLeads: number;
  customers: number;
  statusCounts: Record<string, number>;
  newThisYear: [];
  buildedClientsByMonth: [];
  recentClients: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    status: string;
    createdAt: string;
  }[];
};

const pipelineStatuses = ["New", "Contacted", "Qualified", "Customer", "Lost"];

async function getSummary(): Promise<DashboardSummary> {
  const response = await fetch("/api/dashboard/summary");
  if (!response.ok) throw new Error("Unable to load dashboard summary.");
  return response.json();
}

export default function Page() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.dashboard.summary,
    queryFn: getSummary,
  });

  const metrics = [
    { label: "Total clients", value: data?.totalClients },
    { label: "Added this month", value: data?.newThisMonth },
    { label: "Open leads", value: data?.qualifiedLeads },
    { label: "Customers", value: data?.customers },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              <CardDescription className="text-3xl font-semibold text-foreground">
                {isLoading ? "..." : error ? "-" : metric.value ?? 0}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {error && (
        <div className="flex items-center justify-between gap-4 rounded-md border border-destructive/30 p-4 text-sm text-destructive" role="alert">
          <span>Dashboard data could not be loaded.</span>
          <button className="font-medium underline underline-offset-4" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Clients Pipeline</h2>
            <p className="text-sm text-muted-foreground">Current distribution by status</p>
          </div>
          <div className="space-y-4 rounded-md border bg-card p-5">
            {pipelineStatuses.map((status) => {
              const count = data?.statusCounts[status] ?? 0;
              const percent = data?.totalClients
                ? Math.round((count / data.totalClients) * 100)
                : 0;
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span>{status}</span>
                    <span className="text-muted-foreground">{count} · {percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Recently added</h2>
            <p className="text-sm text-muted-foreground">Latest client records</p>
          </div>
          <div className="divide-y rounded-md border bg-card">
            {isLoading ? (
              <p className="p-5 text-sm text-muted-foreground">Loading clients...</p>
            ) : data?.recentClients.length ? (
              data.recentClients.map((client) => (
                <div key={client._id} className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{client.firstName} {client.lastName}</p>
                    <p className="truncate text-xs text-muted-foreground">{client.phone}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge variant="secondary">{client.status}</Badge>
                    <time className="text-xs text-muted-foreground" dateTime={client.createdAt}>
                      {new Date(client.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-5 text-sm text-muted-foreground">No clients have been added yet.</p>
            )}
          </div>
        </section>


        <section className="space-y-4">
          <ChartAreaLinear buildedClientsByMonth={data?.buildedClientsByMonth ?? []} />
        </section>
      </div>
    </div>
  );
}
