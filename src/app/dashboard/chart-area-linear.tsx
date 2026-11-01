"use client";

import {
  LucideIcon,
  TrendingUp,
  TrendingDown,
  MoveRight,
  FaceSlightlyFrowning,
  Ghost,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A linear area chart of clients in chosen period";

const chartConfig = {
  _id: {
    label: "Clients",
    color: "--var(bg-primary)",
  },
} satisfies ChartConfig;

const monthsByRange: Record<string, number> = {
  "Last 12 months": 12,
  "Last 6 months": 6,
  "Last 3 months": 3,
};

type Trend =
  | { status: "up" | "down" | "flat"; percent: number }
  | { status: "no-data" | "empty-month"; percent: null };

type ClientsByMonth = {
  key: string;
  year: number;
  monthName: string;
  clientCount: number;
};

const trendDescription = {
  up: {
    icon: TrendingUp,
    color: "text-green-500",
    text: (percent?: number) => `Trending up this month by ${percent}%`,
  },
  down: {
    icon: TrendingDown,
    color: "text-red-500",
    text: (percent?: number) => `Trending down this month by ${percent}%`,
  },
  flat: {
    icon: MoveRight,
    color: "text-muted-foreground",
    text: () => "No change this month",
  },
  "no-data": {
    icon: FaceSlightlyFrowning,
    color: "text-muted-foreground",
    text: () => "Not enough data",
  },
  "empty-month": {
    icon: FaceSlightlyFrowning,
    color: "text-muted-foreground",
    text: () => "No statistics in this month",
  },
} satisfies Record<
  Trend["status"],
  { icon: LucideIcon; color: string; text: (percent?: number) => string }
>;

const trendEmpty = {
  noData: { status: "no-data", percent: null },
  emptyMonth: { status: "empty-month", percent: null },
} as const satisfies Record<string, Trend>;

const findTrend = (clients: ClientsByMonth[]): Trend => {
  if (clients.length < 2) return trendEmpty.noData;

  const withoutLastMonthClients = clients.slice(0, -1);
  const lastMonthClientsValue = clients[clients.length - 1].clientCount;

  if (lastMonthClientsValue === 0) return trendEmpty.emptyMonth;

  const findAverageValue = (clients: any[]): number => {
    const averageValue =
      clients.reduce((sum, m) => (sum += m.clientCount), 0) / clients.length;

    return averageValue;
  };

  const averageValue = findAverageValue(withoutLastMonthClients);
  if (averageValue === 0) return trendEmpty.noData;

  const getPercent = (averageValue: number, lastMonthClientsValue: number) => {
    return Number(
      (((lastMonthClientsValue - averageValue) / averageValue) * 100).toFixed(
        1,
      ),
    );
  };

  const makeTrend = (percent: number): Trend => ({
    status: percent > 0 ? "up" : percent < 0 ? "down" : "flat",
    percent: Math.abs(percent),
  });

  const percent = getPercent(averageValue, lastMonthClientsValue);

  return makeTrend(percent);
};

export function ChartAreaLinear({
  buildedFullMonthsList,
}: {
  buildedFullMonthsList: any[];
}) {
  const [timerange, setTimerange] = useState<string>("Last 12 months");
  const timerangeSelectValues = [
    {
      label: "Last 12 months",
    },
    {
      label: "Last 6 months",
    },
    {
      label: "Last 3 months",
    },
  ];

  const visibleData = buildedFullMonthsList.slice(-monthsByRange[timerange]);

  const trend = findTrend(visibleData);
  const trendResult = trendDescription[trend.status];
  console.log(trendResult);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-3 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg font-semibold">Total clients by chosen period.</CardTitle>
          <CardDescription>
            This data chart shows clients by each month of the last year.
          </CardDescription>
        </div>
        <Select value={timerange} onValueChange={setTimerange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {timerangeSelectValues.map((timerangeSelectValue, index) => {
              return (
                <SelectItem
                  key={`SelectItem-${index}`}
                  value={timerangeSelectValue.label}
                >
                  {timerangeSelectValue.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={visibleData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="monthName"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="clientCount"
              type="linear"
              fill="var(--color-chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {trendResult && (
                <>
                  <p>{trendResult.text(trend.percent ?? 0)}</p>
                  <trendResult.icon
                    className={`h-4 w-4 ${trendResult.color}`}
                  />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {visibleData?.[0]?.monthName &&
                `${visibleData[0].monthName}-${visibleData[visibleData.length - 1].monthName} ${visibleData[visibleData.length - 1].year}`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
