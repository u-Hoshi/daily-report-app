"use client";

import dynamic from "next/dynamic";
const ReactSimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"; // prettier-ignore
import "github-markdown-css/github-markdown.css";
import { PenLine, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const savedContent = localStorage.getItem("smde_saved_content") ?? "";
      const { data, error } = await supabase.from("reports").select("*");
      setMarkdownValue(savedContent);
    })();
  }, []);

  const onChange = (value: string) => {
    setMarkdownValue(value);
  };

  const onSubmit = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) return console.error("セッションエラー:", sessionError);

      if (!session) return console.log("ログインしていません");

      const userId = session.user.id;
      const { error } = await supabase
        .from("reports")
        .insert([{ content: markdownValue, user_id: userId }]);
    } catch (e) {
      console.log("error", e);
    }
  };
  // };

  const onRequestAdvice = () => {};

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
        enabled: true,
        uniqueId: "saved_content",
        delay: 1000,
      },
      hideIcons: ["image", "fullscreen", "side-by-side", "preview", "guide"],
    };
  }, []);

  return (
    <>
      <div className="">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenLine className="h-5 w-5" />
              日報を書く
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Tabs defaultValue="markdown">
                <TabsList>
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="markdown">
                  <ReactSimpleMdeEditor
                    value={markdownValue}
                    onChange={onChange}
                    options={options}
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div
                    className="markdown-body p-4 border border-gray-300 h-72 overflow-y-auto"
                    style={{ fontFamily: "inherit", fontSize: "inherit" }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>
                      {markdownValue}
                    </ReactMarkdown>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div>
                <Button
                  variant="secondary"
                  onClick={onSubmit}
                  className="w-60"
                  // disabled={!value.trim()}
                >
                  <Save className="h-4 w-4 mr-2" />
                  保存する
                </Button>
              </div>
              <div>
                <Button
                  onClick={onRequestAdvice}
                  className="w-60"
                  // disabled={!value.trim()}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  アドバイスをもらう
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="h-fit bg-secondary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Geminiからのアドバイス
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-fit rounded-lg bg-background p-4">
            {true ? (
              <p className="whitespace-pre-wrap">{"advice"}</p>
            ) : (
              <p className="text-muted-foreground text-center">
                日記を書いて保存すると、Geminiからのアドバイスが表示されます
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
