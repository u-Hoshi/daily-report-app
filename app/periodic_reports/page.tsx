"use client";

import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MonthPicker } from "@/components/ui/monthpicker";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns/format";
import { PopoverClose } from "@radix-ui/react-popover";

const PeridoicReports = () => {
  const [goal, setGoal] = useState(350);
  const [date, setDate] = useState<Date>();

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <>
      <h1>週報・月報を振り返る</h1>
      <main>
        <Tabs defaultValue="weekly_reports" className="">
          <TabsList>
            <TabsTrigger value="weekly_reports">週報</TabsTrigger>
            <TabsTrigger value="monthly_reports">月報</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly_reports">
            <div className="p-4 pb-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "MMM yyyy")
                    ) : (
                      <span>Pick a month</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <PopoverClose asChild>
                    <MonthPicker onMonthSelect={setDate} selectedMonth={date} />
                  </PopoverClose>
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>
          <TabsContent value="monthly_reports">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default PeridoicReports;
