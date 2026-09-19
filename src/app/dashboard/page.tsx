import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import data from "./data.json";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartPieLegend } from "@/components/dashboard/pie-chart-legend";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen md:h-screen w-full gap-4">
      <div className="flex flex-col md:flex-row md:h-[50%]  gap-4">
        <div className="h-32 md:h-full flex-1">
          <Card className="w-full max-w-full [--card-spacing:--spacing(6)] ">
            <CardHeader className="flex flex-col">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-xs sm:text-[12px] md:text-[10px] lg:text-sm text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </div>
              <CardDescription className="mt-1.5 mb-2 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-lg text-black font-bold md:text-[15px] lg:text-2xl">
                    ₸679,050.40
                  </span>
                </div>
                <div>
                  <p className="text-sm text-black font-medium">
                    Trending up this month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tourists for the last 6 months
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="h-32 md:h-full flex-1">
          <Card className="w-full max-w-full [--card-spacing:--spacing(6)]">
            <CardHeader className="flex flex-col">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-xs sm:text-[12px] md:text-[10px] lg:text-sm text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </div>
              <CardDescription className="mt-1.5 mb-2 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-lg text-black font-bold md:text-[15px] lg:text-2xl">
                    ₸679,050.40
                  </span>
                </div>
                <div>
                  <p className="text-sm text-black font-medium">
                    Trending up this month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tourists for the last 6 months
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>{" "}
        <div className="h-32 md:h-full flex-1 flex justify-center items-center">
          <ChartPieLegend />
        </div>
        <div className="h-32 md:-full flex-1 w-full">
          <Card className="w-full max-w-full [--card-spacing:--spacing(6)]">
            <CardHeader className="flex flex-col">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-xs sm:text-[12px] md:text-[10px] lg:text-sm text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </div>
              <CardDescription className="mt-1.5 mb-2 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-lg text-black font-bold md:text-[15px] lg:text-2xl">
                    ₸679,050.40
                  </span>
                </div>
                <div>
                  <p className="text-sm text-black font-medium">
                    Trending up this month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tourists for the last 6 months
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="w-full md:h-[50%]">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
