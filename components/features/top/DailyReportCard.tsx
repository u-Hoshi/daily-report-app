"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"; // prettier-ignore
import MarkdownView from "@/components/markdown-view";

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
  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle>{new Date(date).toLocaleDateString()}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pb-0">
        <div className="">
          {/* TODO: カード内の各セクションのタイトルの有無を検討 */}
          {/* <h3 className="text-lg font-semibold mb-2">日報</h3> */}
          <div className="line-clamp-3">
            <div
              className="markdown-body p-4 border border-gray-300 overflow-y-auto"
              style={{ fontFamily: "inherit", fontSize: "inherit" }}
            >
              <MarkdownView markdown={report.content} />
            </div>
          </div>
        </div>
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
