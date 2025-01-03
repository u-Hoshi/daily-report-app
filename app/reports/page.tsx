export const runtime = "edge";

import { CalendarReports } from "@/components/features/Reports/CalendarReports";
import TimelineReports from "@/components/features/Reports/TimelineReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";

export default async function Reports() {
  const supabase = await createClient();
  const { data: reports, error } = await supabase.from("reports").select();

  // エラーが発生した場合
  if (error) {
    return <div>reportsの取得でエラーが発生しました</div>;
  }

  return (
    <>
      <h1>日報を振り返る</h1>
      <main>
        <Tabs defaultValue="calendarView" className="">
          <TabsList>
            <TabsTrigger value="calendarView">カレンダービュー</TabsTrigger>
            <TabsTrigger value="timelineView">タイムラインビュー</TabsTrigger>
          </TabsList>
          <TabsContent value="calendarView">
            <CalendarReports />
          </TabsContent>
          <TabsContent value="timelineView">
            <TimelineReports />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
