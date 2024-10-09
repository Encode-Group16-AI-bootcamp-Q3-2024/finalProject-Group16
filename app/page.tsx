"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FaDownload,
  FaShareAlt,
  FaChevronDown,
  FaChevronUp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function CryptoSentimentAnalysis() {
  const [projectName, setProjectName] = useState("");
  const { messages, append, isLoading } = useChat();
  const [collapsedMessages, setCollapsedMessages] = useState<number[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [shareContent, setShareContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim() === "") {
      append({
        role: "assistant",
        content: "Please enter a valid project name.",
      });
      return;
    }

    // Send the prompt to the AI
    const newMessageIndex = messages.length;
    setCollapsedMessages((prev) => [...prev, newMessageIndex]);
    await append({
      role: "user",
      content: `Provide a detailed analysis of ${projectName} in the crypto landscape, including:

1. Market Positioning:
   • Current market position
   • Key competitors
   • Unique selling points

2. Historical Context:
   • Significant past events
   • Major milestones achieved

3. Sentiment Analysis:
   • Overall market sentiment
   • Social media perception
   • Investor confidence

Please format the response with clear headings, bullet points, and proper spacing for readability.`,
    });
  };

  const downloadPDF = (content: string) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Crypto Sentiment Analysis", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Project: ${projectName}`, 20, 30);
    doc.setFontSize(10);

    const lines = content.split("\n");
    let y = 40;
    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      if (line.startsWith("#")) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        y += 5;
      } else if (line.startsWith("•")) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
      } else {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
      }
      const splitLine = doc.splitTextToSize(line.trim(), 180);
      doc.text(splitLine, 15, y);
      y += (line.startsWith("#") ? 10 : 7) * splitLine.length;
    });

    doc.save(`${projectName}_crypto_analysis.pdf`);
  };

  const shareAnalysis = (content: string) => {
    setIsShareModalOpen(true);
    setShareContent(content);
  };

  const formatContentForPlatform = (platform: string, content: string) => {
    const truncate = (str: string, length: number) => {
      return str.length > length ? str.substring(0, length - 3) + "..." : str;
    };

    switch (platform) {
      case "facebook":
        return truncate(content, 2000);
      case "twitter":
        return truncate(content, 280);
      case "linkedin":
        return truncate(content, 1300);
      default:
        return content;
    }
  };

  const handleShareOnPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    const formattedContent = formatContentForPlatform(platform, shareContent);
    setShareContent(formattedContent);
  };

  const publishContent = () => {
    if (selectedPlatform) {
      let url = "";
      switch (selectedPlatform) {
        case "facebook":
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareContent)}`;
          break;
        case "twitter":
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}`;
          break;
        case "linkedin":
          url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent("Crypto Sentiment Analysis")}&summary=${encodeURIComponent(shareContent)}`;
          break;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setIsShareModalOpen(false);
  };

  const toggleCollapse = (index: number) => {
    setCollapsedMessages((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 flex flex-col lg:flex-row p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full lg:w-1/3 mb-4 lg:mb-0 lg:mr-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Crypto Sentiment Analysis
        </h1>
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Sentiment"}
          </Button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full lg:w-2/3 overflow-y-auto max-h-screen">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${message.role === "assistant" ? "bg-blue-100" : "bg-gray-100"}`}
            >
              {message.role === "assistant" && (
                <div className="flex justify-end mb-2">
                  <Button
                    onClick={() => downloadPDF(message.content)}
                    className="mr-2"
                    size="sm"
                  >
                    <FaDownload className="mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={() => shareAnalysis(message.content)}
                    size="sm"
                  >
                    <FaShareAlt className="mr-2" />
                    Share
                  </Button>
                </div>
              )}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleCollapse(index)}
              >
                <p className="font-semibold">
                  {message.role === "user" ? "Your Query:" : "Analysis:"}
                </p>
                {message.role === "user" &&
                  (collapsedMessages.includes(index) ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronUp />
                  ))}
              </div>
              {(message.role === "assistant" ||
                !collapsedMessages.includes(index)) && (
                <div
                  className="mt-2 whitespace-pre-wrap prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Analysis</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center space-x-4 my-4">
            <Button onClick={() => handleShareOnPlatform("facebook")}>
              <FaFacebookF className="mr-2" />
              Facebook
            </Button>
            <Button onClick={() => handleShareOnPlatform("twitter")}>
              <FaTwitter className="mr-2" />
              Twitter
            </Button>
            <Button onClick={() => handleShareOnPlatform("linkedin")}>
              <FaLinkedinIn className="mr-2" />
              LinkedIn
            </Button>
          </div>
          {selectedPlatform && (
            <div>
              <Label htmlFor="shareContent">Share Content</Label>
              <Textarea
                id="shareContent"
                value={shareContent}
                onChange={(e) => setShareContent(e.target.value)}
                className="mt-2"
                rows={5}
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={publishContent} disabled={!selectedPlatform}>
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
