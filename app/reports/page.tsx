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
      <h1>reports</h1>
      <main>
        {reports.length > 0 && (
          <ul>
            {reports.map((report) => (
              <li key={report.id}>{report.content}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
