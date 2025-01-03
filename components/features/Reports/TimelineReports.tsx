"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { DailyReportCard } from "@/components/orgnisms/DailyReportCard";
import MonthSelector from "@/components/orgnisms/MonthSelector";

type Report = {
  id: number;
  content: string;
  created_at: string;
  feedbacks?: { content: string }[];
};

const TimelineReports = () => {
  const [reports, setReports] = useState<Report[]>();
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const handleMonthSelect = (date: Date) => {
    setSelectedMonth(date);
  };

  const supabase = createClient();

  useEffect(() => {
    if (!selectedMonth) return;
    setReports(undefined);

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
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthSelect={handleMonthSelect}
      />
      <div className="space-y-6">
        {reports &&
          reports.map((report: Report) => (
            <DailyReportCard
              key={report.id}
              date={report.created_at}
              report={report}
            />
          ))}
      </div>
    </div>
  );
};

export default TimelineReports;
