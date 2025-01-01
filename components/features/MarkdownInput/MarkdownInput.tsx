"use client";

import dynamic from "next/dynamic";
const ReactSimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"; // prettier-ignore
import "github-markdown-css/github-markdown.css";
import { PenLine, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import MarkdownView from "@/components/markdown-view";

type Props = {
  report?: {
    id: number;
    content: string;
    created_at: string;
    feedbacks: { content: string }[];
  };
  handleSubmit: (content: string) => Promise<void>;
};

export const MarkdownEditor: React.FC<Props> = ({ report, handleSubmit }) => {
  const supabase = createClient();
  const [markdownValue, setMarkdownValue] = useState("");
  const [feedback, setFeedback] = useState(report?.feedbacks[0]?.content ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(true);

  useEffect(() => {
    setMarkdownValue(report?.content || "");
    setIsInitLoading(false);
  }, []);

  const onChange = (value: string) => {
    setMarkdownValue(value);
  };

  const handleSubmitPrompt = async (content: string) => {
    await createClient();
    setIsLoading(true);
    const prompt_post = `
    あなたは私の上司です。下記の日報を読んで、前向きなフィードバックをください。
    ${content}
    `;
    try {
      const response = await axios.post("/api/gemini-api", {
        prompt_post,
      });
      setFeedback(response.data.text);

      if (!report?.id) return;
      const { error } = await supabase
        .from("feedbacks")
        .insert([{ content: response.data.text, report_id: report?.id }]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("axios error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * TODO:
   * 1. anyを外す
   * 2. codeブロックで記入したコードをハイライトする
   * 3. 画像アップロードできるようにする
   * 4. 編集中はマークダウンスタイルを反映しない
   * react-simplemde-editor か react-mde の検討
   */
  const options: any = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      autosave: {
        // enabled: false,
        // uniqueId: "saved_content",
        // delay: 1000,
      },
      hideIcons: ["image", "fullscreen", "side-by-side", "preview", "guide"],
      status: false,
    };
  }, []);

  return (
    <>
      <div className="">
        <h2 className="flex text-2xl font-semibold pb-4">
          <PenLine className="h-8 w-8 mr-2" />
          日報を書く
        </h2>
        <div className=" justify-end">
          <div className="space-y-4 block">
            <Tabs defaultValue="markdown">
              <div className="justify-end">
                <div className="block justify-end">
                  <TabsList>
                    <TabsTrigger value="markdown">Markdown</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              <TabsContent value="markdown" className="min-h-[371px]">
                {!isInitLoading ? (
                  <ReactSimpleMdeEditor
                    value={markdownValue}
                    onChange={onChange}
                    options={options}
                  />
                ) : (
                  <Skeleton className="h-[371px] w-full	 rounded-xl" />
                )}
              </TabsContent>
              <TabsContent value="preview">
                <div
                  className="markdown-body p-4 border border-gray-300 h-72 overflow-y-auto"
                  style={{ fontFamily: "inherit", fontSize: "inherit" }}
                >
                  <MarkdownView markdown={markdownValue} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex flex-col pt-2 sm:flex-row justify-center gap-4">
          <div>
            <Button
              variant="secondary"
              onClick={() => handleSubmit(markdownValue)}
              className="w-60"
              // disabled={!value.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              保存する
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleSubmitPrompt(markdownValue)}
              className="w-60"
              disabled={isLoading}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              アドバイスをもらう
            </Button>
          </div>
        </div>
      </div>
      <Card className="h-fit bg-secondary/50">
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
    </>
  );
};
