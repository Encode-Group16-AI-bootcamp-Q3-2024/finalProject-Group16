import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  try {
      const { messages } = await req.json();

      // Ask OpenAI for a streaming chat completion
      const response = await openai.chat.completions.create({
          model: "gpt-4",  // Ensure this model is correct
          stream: true,
          messages: [
              {
                  role: "system",
                  content: "You are an expert in analyzing sentiment analysis for all crypto-related projects. rovide a detailed sentiment analysis for the user input crypto project  across several reputable sources, including social media trends, market data, and technical analysis. Specifically:Source 1: Analyze the sentiment and technical analysis from twitter.Source 2: Provide sentiment insights from reddit, focusing on market trends and news.Source 3: Summarize the sentiment from Coinbase  incorporating both social media and investor behavior trends.Deliverables:Sentiment Breakdown: Summarize the positive, neutral, and negative sentiments for each source.Overall Sentiment: Aggregate the data from all sources to provide an overall market sentiment (positive, neutral, or negative).Recommendation: Based on the overall sentiment, provide a buy, hold, or sell recommendation, clearly explaining the rationale..",
              },
              ...messages,
          ],
      });

      // Convert the response into a friendly text-stream
      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
  } catch (error) {
      console.error("Error during API request:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch data. Please try again." }), { status: 500 });
  }
}