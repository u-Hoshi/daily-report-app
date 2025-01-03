"use client";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { createClient } from "@/utils/supabase/client";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // prettier-ignore

import { ChevronLeft, ChevronRight } from "lucide-react";
import { endOfMonth, endOfWeek, format, isFirstDayOfMonth, parseISO, startOfMonth, startOfWeek } from "date-fns"; // prettier-ignore
import { ja } from "date-fns/locale";
import { DailyReportCard } from "@/components/orgnisms/DailyReportCard";

type Report = {
  id: number;
  content: string;
  created_at: string;
  feedbacks?: { content: string }[];
};

type CalendarRange = {
  start: Date;
  end: Date;
};

const today = new Date();

export const CalendarReports = () => {
  const supabase = createClient();
  const calendarRef = useRef<FullCalendar>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>();
  const [selectedRange, setSelectedRange] = useState<CalendarRange>({
    start: startOfWeek(startOfMonth(new Date()), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(new Date()), { weekStartsOn: 0 }),
  });
  const [selectedEvent, setSelectedEvent] = useState({
    title: "",
    content: "",
    date: "",
    feedbacks: "",
  });

  const handleEventClick = (arg: EventClickArg) => {
    const event = arg.event._def;
    setSelectedEvent({
      title: event.title,
      content: event.extendedProps.content,
      date: event.extendedProps.created_at,
      feedbacks: event.extendedProps.feedbacks[0].content,
    });
    setIsModalOpen(true);
  };

  const handleDatesSet = (arg: DatesSetArg) => {
    setSelectedRange({
      start: arg.start,
      end: arg.end,
    });
  };

  const goNext = () => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };
  const goBack = () => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const adjustDisplayDate = isFirstDayOfMonth(selectedRange.start)
    ? selectedRange.start // 1日の場合はそのまま
    : new Date(
        selectedRange.start.getFullYear(),
        selectedRange.start.getMonth() + 1,
        1
      ); // それ以外は翌月の1日

  const formatMonth = (date: Date): string => {
    return format(date, "yyyy年 M月", { locale: ja });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!adjustDisplayDate) return;
    setReports(undefined);

    const fetchData = async () => {
      await createClient();

      if (!adjustDisplayDate) return;
      const startOfMonth = new Date(selectedRange.start.getFullYear(), selectedRange.start.getMonth(), 1, 0, 0, 0); // prettier-ignore
      const endOfMonth = new Date(selectedRange.end.getFullYear(), selectedRange.end.getMonth() + 1, 0, 23, 59, 59); // prettier-ignore

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
        setIsLoading(false);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [selectedRange]);

  // 不要であれば削除
  // const handleDateSelect = (selectInfo: DateSelectArg) => {
  //   let title = prompt("Please enter a new title for your event");
  //   let calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect();
  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }
  // };

  const formatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd");
  };

  // const handleEventClick = (arg: any) => {
  //   console.log("handleEventClickクリック");
  //   console.log(arg);
  //   console.log(arg.event);
  //   setIsOpenEventModal(true);
  // };

  return (
    <>
      {/* <button onClick={goNext}>Go Next!</button>
      <button onClick={goBack}>Go Back!</button> */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <Button
          variant="outline"
          onClick={goBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          先月へ
        </Button>

        <div className="text-lg font-medium">
          {formatMonth(adjustDisplayDate)}
        </div>

        <Button
          variant="outline"
          onClick={goNext}
          className="flex items-center gap-2"
        >
          次月へ
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {!isLoading && (
        <div className="max-w-5xl mx-auto">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={reports?.map((report) => ({
              id: String(report.id),
              // title: report.content,
              title: "日報",
              date: formatDate(report.created_at),
              created_at: report.created_at,
              content: report.content,
              feedbacks: report.feedbacks,
            }))}
            // locale="ja"
            headerToolbar={{
              right: "",
              center: "",
              left: "",
            }}
            fixedWeekCount={false}
            // select={handleDateSelect}
            ref={calendarRef}
            datesSet={handleDatesSet} //
            eventClick={(arg: EventClickArg) => handleEventClick(arg)}
            eventClassNames="cursor-pointer hover:opacity-80"
          />
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[920px] overflow-scroll">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between hidden">
              <span>日報 - {selectedEvent?.date}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="space-y-4">
              <DailyReportCard
                date={selectedEvent.date}
                report={{
                  id: 1,
                  content: selectedEvent.content,
                  created_at: selectedEvent.date,
                  feedbacks: [{ content: selectedEvent?.feedbacks }],
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
