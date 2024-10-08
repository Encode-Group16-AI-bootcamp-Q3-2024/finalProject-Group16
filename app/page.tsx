"use client"

import { useState } from "react"
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function CryptoVibeCheck() {
  const [projectName, setProjectName] = useState("")
  const [response, setResponse] = useState("")
  const { messages, append, isLoading } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim() === "") {
      setResponse("Please enter a valid project name.")
      return
    }
    // Random example vibes
    {/*
    const vibes = ["bullish", "bearish", "neutral", "to the moon", "HODL"]
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)]
    setResponse(`The vibe for ${projectName} is: ${randomVibe}!`)
    */}
    // receive response from API
    append({
      role: "user",
      content: `Provide a 2-paragraph summary of the current market positioning of ${projectName} within the crypto landscape, including references to any relevant past events. `,
    })
    if (messages.length > 0 && !messages[messages.length - 1]?.content.startsWith("Generate")){
      setResponse(messages[messages.length - 1]?.content)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Crypto Vibe Check</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-lg font-medium">
              Project Name
            </Label>
            <Input
              id="projectName"
              type="text"
              placeholder="Enter crypto project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Check Vibe
          </Button>
        </form>
        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Vibe Check Result:</h2>
            <p className="text-lg">{response}</p>
          </div>
        )}
      </div>
    </div>
  )
}