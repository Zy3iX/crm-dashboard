"use client";

import { TrendingUp } from "lucide-react";
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
  month: {
    label: "Clients",
    color: "--var(bg-primary)",
  },
} satisfies ChartConfig;

const chartTimeRangeSelect = [
  { value: "1y", label: "Last 12 months" },
  { value: "6m", label: "Last 6 month" },
  { value: "1m", label: "Last 1 month" },
  { value: "1w", label: "Last week" },
] as const;

type chartTimeRange = (typeof chartTimeRangeSelect)[number]["value"];

export function ChartAreaLinear({
  buildedClientsByMonth,
}: {
  buildedClientsByMonth: [];
}) {
  const [timeRange, setTimeRange] = useState<chartTimeRange>("1y");

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {chartTimeRangeSelect.map((timerange, index)=>{
              return(
                <SelectItem key={`SelectItem-${index}`} value={timerange.value}>{timerange.label}</SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={buildedClientsByMonth}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
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
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
