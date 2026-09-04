import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import data from "./data.json";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen md:h-screen w-full">
      <div className="flex flex-col md:flex-row md:h-[30%] gap-4">
        <div className="h-32 md:h-full flex-1">
          <Card className="w-full max-w-lg [--card-spacing:--spacing(6)]">
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
          <Card className="w-full max-w-lg [--card-spacing:--spacing(6)]">
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
        <div className="h-32 md:h-full flex-1">
          <Card className="w-full max-w-lg [--card-spacing:--spacing(6)]">
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
        {/* <div className="h-32 md:h-full flex-1 bg-emerald-500 flex items-center justify-center text-white font-bold rounded">
          Lil Chunk 2
        </div>
        <div className="h-32 md:h-full flex-1 bg-emerald-500 flex items-center justify-center text-white font-bold rounded">
          Lil Chunk 3
        </div> */}
      </div>

      <div className="w-full md:h-[70%]">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
