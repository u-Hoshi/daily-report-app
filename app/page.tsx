import { MarkdownEditor } from "@/components/features/MarkdownInput/MarkdownInput";
import { DailyReportCard } from "@/components/features/top/DailyReportCard";
import GeminiChatBox from "@/components/features/top/GeminiChatBox";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";

const reports = [
  {
    date: "2024-12-31",
    report:
      "# サンプル\n### サンプル\n##### サンプル\n###### サンプル\n**ほげ**\n*foo*\n> bar\n* 確認\n* cofirm\n1. リスト\n2. リスト\n3. リスト\n[googleのリンク](https://www.google.co.jp/)",
    advice:
      "振り返りと目標設定、とても良い取り組みですね。目標は具体的な行動計画に落とし込むと、より達成しやすくなりますよ。",
  },
  {
    date: "2024-12-30",
    report: `# サンプル
            ### サンプル
            ##### サンプル
            ###### サンプル
            - [ ] todo
            **ほげ**
            *foo*
            > bar`,
    advice:
      "チームでの話し合いを通じて新しいアイデアが生まれるのは素晴らしいことです。これらのアイデアを記録し、定期的に見直すことをお勧めします。",
  },
  {
    date: "2024-12-29",
    report:
      "午前中はコードレビュー、午後はドキュメント作成に集中した。効率よく作業が進められた。",
    advice:
      "タスクの種類に応じて時間を区切って作業するのは、とても効果的な方法です。集中力の維持にも役立ちますね。",
  },
  {
    date: "2024-12-28",
    report:
      "新機能の実装で少し詰まったが、先輩に相談して解決できた。学びが多い一日だった。",
    advice:
      "困ったときに適切に相談できるのは重要なスキルです。得られた知識を次回に活かせるよう、解決方法をメモしておくと良いでしょう。",
  },
  {
    date: "2024-12-27",
    report:
      "朝のミーティングで新しいタスクが追加された。優先順位を整理して対応できた。",
    advice:
      "タスクの優先順位付けが適切にできていますね。常にビジネスインパクトを意識した判断ができていると感じます。",
  },
  {
    date: "2024-12-26",
    report:
      "テストケースの作成と実行を行った。バグを早期に発見できて良かった。",
    advice:
      "テストの重要性を理解し、実践できているのは素晴らしいです。予防的なアプローチが品質向上に繋がります。",
  },
  {
    date: "2024-12-25",
    report:
      "クリスマス当番だったが、システムの監視と軽微な保守作業を完了できた。",
    advice:
      "休日勤務お疲れ様でした。システムの安定運用に貢献できていますね。次の休暇でしっかり休息を取ることをお勧めします。",
  },
];

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6">
        <MarkdownEditor />
        <Separator />
        <h2 className="flex text-2xl font-semibold">
          <BookOpen className="h-8 w-8 mr-2" />
          1週間の日報
        </h2>
        <div className="space-y-6">
          {reports.map((report, index) => (
            <DailyReportCard
              key={index}
              date={report.date}
              report={report.report}
              advice={report.advice}
            />
          ))}
        </div>
      </main>
    </>
  );
}
