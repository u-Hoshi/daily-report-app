"use client";

import dynamic from "next/dynamic";
const ReactSimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "github-markdown-css/github-markdown.css";
import { Skeleton } from "@/components/ui/skeleton";
import MarkdownView from "@/components/markdown-view";

type Props = {
  value: string;
  handleMarkdownValueChange: (value: string) => void;
};

export const MarkdownEditor: React.FC<Props> = ({
  value,
  handleMarkdownValueChange,
}) => {
  const [isInitLoading, setIsInitLoading] = useState(true);

  useEffect(() => {
    setIsInitLoading(!value);
  }, []);

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
    <div className="justify-end">
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
                value={value}
                onChange={handleMarkdownValueChange}
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
              <MarkdownView markdown={value} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
