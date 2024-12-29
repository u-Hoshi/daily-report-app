import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt_post } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
  const result = await model.generateContent(prompt_post);
  const response = await result.response;

  return NextResponse.json({
    text: response.text(),
    status: "success",
  });
}
