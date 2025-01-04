"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"; // prettier-ignore
import MarkdownView from "@/components/markdown-view";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MarkdownEditor } from "../MarkdownEditor";
import { createClient } from "@/utils/supabase/client";

interface DailyReportCardProps {
  date: string;
  report: {
    id: number;
    content: string;
    created_at: string;
    feedbacks?: { content: string }[];
  };
}

export function DailyReportCard({ date, report }: DailyReportCardProps) {
  const [markdownValue, setMarkdownValue] = useState("");
  const [editing, setEditing] = useState(false);
  const displayDate = new Date(date).toLocaleDateString();
  const handleMarkdownValueChange = (value: string) => {
    setMarkdownValue(value);
  };
  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSubmit = async (content: string) => {
    const supabase = createClient();

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) return console.error("セッションエラー:", sessionError);
      if (!session) return console.log("ログインしていません");

      await supabase
        .from("reports")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", report?.id);
      setEditing(false);
      setMarkdownValue(content);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex justify-between items-center">
          <CardTitle>{displayDate}</CardTitle>
          <Button
            variant="ghost"
            className="ml-2 hover:bg-gray-200 transition-colors"
            onClick={handleEditClick}
            aria-label="編集"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-0">
        {!!editing ? (
          <>
            <MarkdownEditor
              value={markdownValue}
              handleMarkdownValueChange={handleMarkdownValueChange}
            />
            <div className="flex justify-end mt-2">
              <div className="flex justify-end pr-2">
                <Button onClick={handleEditClick}>キャンセル</Button>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSubmit(markdownValue)}>
                  保存
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="">
            {/* TODO: カード内の各セクションのタイトルの有無を検討 */}
            {/* <h3 className="text-lg font-semibold mb-2">日報</h3> */}
            <div className="line-clamp-3">
              <div
                className="markdown-body p-4 border border-gray-300 overflow-y-auto"
                style={{ fontFamily: "inherit", fontSize: "inherit" }}
              >
                <MarkdownView markdown={markdownValue} />
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">
          {/* <h3 className="text-lg font-semibold flex items-center gap-1 mb-2">
            <Sparkles className="h-5 w-5" /> アドバイス
          </h3> */}
          {report.feedbacks?.[0]?.content && (
            <div className="bg-secondary p-3 rounded-md">
              <MarkdownView markdown={report.feedbacks[0].content} />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center"></CardFooter>
    </Card>
  );
}
