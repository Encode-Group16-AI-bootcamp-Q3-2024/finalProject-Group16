"use client"

import { useState } from "react"
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function CryptoSentimentAnalysis() {
  const [projectName, setProjectName] = useState("")
  const { messages, append, isLoading } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim() === "") {
      append({
        role: "assistant",
        content: "Please enter a valid project name."
      })
      return
    }

    // Send the prompt to the AI
    await append({
      role: "user",
      content: `Provide a 2-paragraph summary of the current market positioning of ${projectName} within the crypto landscape, including references to any relevant past events.Provide a detailed sentiment analysis for ${projectName} as described in your instructions.`
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Crypto Sentiment Analysis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-lg font-medium">
              Project Name
            </Label>
            <Input
              id="projectName"
              type="text"
              placeholder="Enter crypto project name "
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Sentiment"}
          </Button>
        </form>
        <div className="mt-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`p-4 rounded-md ${message.role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <p className="font-semibold">{message.role === 'user' ? 'Your Query:' : 'Analysis:'}</p>
              <div className="mt-2 whitespace-pre-wrap">{message.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}