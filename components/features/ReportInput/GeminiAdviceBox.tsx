import MarkdownView from "@/components/markdown-view";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"; // prettier-ignore
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type GeminiAdviceProps = {
  feedback?: string;
  isLoading: boolean;
  className?: string;
};

export const GeminiAdvice: React.FC<GeminiAdviceProps> = ({
  feedback,
  isLoading,
  className,
}) => {
  return (
    <Card className={cn("h-fit bg-secondary/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Geminiからのアドバイス
        </CardTitle>
      </CardHeader>
      <CardContent>
        {feedback ? (
          <MarkdownView markdown={feedback} />
        ) : isLoading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <p className="text-muted-foreground text-center">
            日記を書いて保存すると、Geminiからのアドバイスが表示されます
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GeminiAdvice;
