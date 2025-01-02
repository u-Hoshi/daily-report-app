export const runtime = "edge";

import TimelineReports from "@/components/features/reports/TimelineReports";
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
        <Tabs defaultValue="timelineView" className="">
          <TabsList>
            <TabsTrigger value="calendarView">カレンダービュー</TabsTrigger>
            <TabsTrigger value="timelineView">タイムラインビュー</TabsTrigger>
          </TabsList>
          <TabsContent value="calendarView">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="timelineView">
            <TimelineReports />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
