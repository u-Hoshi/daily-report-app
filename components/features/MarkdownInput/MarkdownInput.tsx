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
import "github-markdown-css/github-markdown.css";

export const MarkdownEditor = () => {
  const [markdownValue, setMarkdownValue] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("smde_saved_content") ?? "";
    setMarkdownValue(savedContent);
  }, []);

  const onChange = (value: string) => {
    setMarkdownValue(value);
  };

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: "saved_content",
        delay: 1000,
      },
    };
  }, []);

  return (
    <>
      <ReactSimpleMdeEditor
        value={markdownValue}
        onChange={onChange}
        options={options}
      />
      <h1 className="text-4xl font-bold mb-4 text-left pl-4">プレビュー</h1>
      <div
        className="markdown-body p-4 border border-gray-300 h-72 overflow-y-auto"
        style={{ fontFamily: "inherit", fontSize: "inherit" }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>
          {markdownValue}
        </ReactMarkdown>
      </div>
    </>
  );
};
