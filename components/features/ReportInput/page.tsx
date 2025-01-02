"use client";

import "easymde/dist/easymde.min.css";
import { useEffect, useMemo, useState } from "react";
import "github-markdown-css/github-markdown.css";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";
import ActionButtons from "./ActionButtons";
import GeminiAdvice from "./GeminiAdviceBox";
import { MarkdownEditor } from "@/components/orgnisms/MarkdownEditor";

type Props = {
  report?: {
    id: number;
    content: string;
    created_at: string;
    feedbacks?: { content: string }[];
  };
  handleSubmit: (content: string) => Promise<void>;
};

export const ReportInput: React.FC<Props> = ({ report, handleSubmit }) => {
  const supabase = createClient();
  const [markdownValue, setMarkdownValue] = useState(report?.content || "");
  const [feedback, setFeedback] = useState(
    report?.feedbacks?.[0]?.content ?? ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkdownValueChange = (value: string) => {
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
      <MarkdownEditor
        value={markdownValue}
        handleMarkdownValueChange={handleMarkdownValueChange}
      />
      <ActionButtons
        onSave={handleSubmit}
        onGetAdvice={handleSubmitPrompt}
        value={markdownValue}
        isLoading={isLoading}
      />
      <GeminiAdvice feedback={feedback} isLoading={isLoading} />
    </>
  );
};
