export const runtime = "edge";

import { MarkdownEditor } from "@/components/features/MarkdownInput/MarkdownInput";
import { DailyReportCard } from "@/components/features/top/DailyReportCard";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { BookOpen } from "lucide-react";
import { revalidatePath } from "next/cache";

const now = new Date();
const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

export default async function Home() {
  const supabase = await createClient();

  const { data: reports, error } = await supabase
    .from("reports")
    .select(`*, feedbacks (*)`)
    .gte("created_at", weekAgo.toISOString())
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching reports:", error);

  const isTodayReport = reports?.[0]
    ? new Date(reports[0].created_at).toDateString() ===
      new Date().toDateString()
    : false;
  const todayReport = isTodayReport && reports ? reports[0] : undefined;

  const handleSubmit = async (content: string) => {
    "use server";
    const supabase = await createClient();
    if (!reports) return;

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) return console.error("セッションエラー:", sessionError);
      if (!session) return console.log("ログインしていません");

      const userId = session.user.id;

      if (isTodayReport) {
        await supabase
          .from("reports")
          .update({ content, updated_at: new Date().toISOString() })
          .eq("id", reports?.[0]?.id);
      } else {
        const { error } = await supabase
          .from("reports")
          .insert([{ content, user_id: userId }]);
      }
      revalidatePath("/");
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6">
        <MarkdownEditor report={todayReport} handleSubmit={handleSubmit} />
        <Separator />
        <h2 className="flex text-2xl font-semibold">
          <BookOpen className="h-8 w-8 mr-2" />
          1週間の日報
        </h2>
        <div className="space-y-6">
          {reports
            ? reports.map((report, index) => (
                <DailyReportCard
                  key={index}
                  date={report.created_at}
                  report={report}
                />
              ))
            : null}
        </div>
      </main>
    </>
  );
}
