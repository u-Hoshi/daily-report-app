"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MonthPicker } from "@/components/ui/monthpicker";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // prettier-ignore
import { createClient } from "@/utils/supabase/client";
import { DailyReportCard } from "../top/DailyReportCard";

type Reports = {
  id: number;
  content: string;
  created_at: string;
  feedbacks?: { content: string }[];
};

const TimelineReports = () => {
  const [reports, setReports] = useState<Reports[]>();
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const handleMonthSelect = (selectedselectedMonth: Date) => {
    setSelectedMonth(selectedselectedMonth);
    setOpen(false);
  };

  const supabase = createClient();

  useEffect(() => {
    if (!selectedMonth) return;

    const fetchData = async () => {
      await createClient();

      if (!selectedMonth) return;
      const startOfMonth = new Date(Date.UTC(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)); // prettier-ignore
      const endOfMonth = new Date(Date.UTC(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1)); // prettier-ignore
      try {
        const { data, error } = await supabase
          .from("reports")
          .select(`*, feedbacks (*)`)
          .gte("created_at", startOfMonth.toISOString())
          .lt("created_at", endOfMonth.toISOString())
          .order("created_at", { ascending: false })
          .limit(31);

        if (error) throw error;

        if (data) setReports(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        //   setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div>
      <div className="p-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[160px] justify-start text-left font-normal",
                !selectedMonth && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedMonth ? (
                `${selectedMonth.getFullYear()}年 ${selectedMonth.getMonth() + 1}月`
              ) : (
                <span>月を選択</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <MonthPicker
              onMonthSelect={handleMonthSelect}
              selectedMonth={selectedMonth}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-6">
        {reports
          ? reports.map((report: Reports, index: any) => (
              <DailyReportCard
                key={index}
                date={report.created_at}
                report={report}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TimelineReports;
