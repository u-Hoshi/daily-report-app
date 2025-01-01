"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import breaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

interface DailyReportCardProps {
  date: string;
  report: string;
  advice: string;
}

export function DailyReportCard({
  date,
  report,
  advice,
}: DailyReportCardProps) {
  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle>{new Date(date).toLocaleDateString()}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          {/* TODO: カード内の各セクションのタイトルの有無を検討 */}
          {/* <h3 className="text-lg font-semibold mb-2">日報</h3> */}
          <div className="line-clamp-3">
            <div
              className="markdown-body p-4 border border-gray-300 overflow-y-auto"
              style={{ fontFamily: "inherit", fontSize: "inherit" }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>
                {report}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <div>
          {/* <h3 className="text-lg font-semibold flex items-center gap-1 mb-2">
            <Sparkles className="h-5 w-5" /> アドバイス
          </h3> */}
          <p className="bg-secondary p-3 rounded-md">{advice}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center"></CardFooter>
    </Card>
  );
}
