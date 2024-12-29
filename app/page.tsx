import GeminiChatBox from "@/components/features/top/GeminiChatBox";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1>日報応援アプリ</h1>
        <GeminiChatBox />
      </main>
    </>
  );
}
