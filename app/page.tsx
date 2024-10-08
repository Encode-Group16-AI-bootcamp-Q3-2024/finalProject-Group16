"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function CryptoVibeCheck() {
  const [projectName, setProjectName] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim() === "") {
      setResponse("Please enter a project name.")
      return
    }
    // Simulate a vibe check response
    const vibes = ["bullish", "bearish", "neutral", "to the moon", "HODL"]
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)]
    setResponse(`The vibe for ${projectName} is: ${randomVibe}!`)
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