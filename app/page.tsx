import { MarkdownEditor } from "@/components/features/MarkdownInput/MarkdownInput";
import GeminiChatBox from "@/components/features/top/GeminiChatBox";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6">
        <MarkdownEditor />
        <GeminiChatBox />
      </main>
    </>
  );
}
