// "use client";

// import { useState } from "react";
// import axios from "axios";

// const prompt = "アメリカと日本の時差を教えて";

// const GeminiChatBox = () => {
//   const [geminiResponse, setGeminiResponse] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");

//   const handleSubmitPrompt = async () => {
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("/api/gemini-api", {
//         prompt_post: prompt,
//       });
//       setGeminiResponse(response.data.text);
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || "APIの呼び出しに失敗しました");
//       } else {
//         setError("予期せぬエラーが発生しました");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleSubmitPrompt}>Gemini APIを叩く</button>
//       {isLoading ? (
//         <div className="flex justify-center" aria-label="読み込み中">
//           <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
//         </div>
//       ) : (
//         <div> {geminiResponse || error}</div>
//       )}
//     </div>
//   );
// };

// export default GeminiChatBox;
