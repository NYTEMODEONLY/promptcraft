"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { processText } from "@/app/actions"
import { Loader2, Copy, CheckCircle2, Save, Trash2, AlertTriangle, Brain } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SavedItem = {
  id: string
  input: string
  output: string
  timestamp: number
}

export function TextFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [activeTab, setActiveTab] = useState("editor")
  const [error, setError] = useState<string | null>(null)
  const [processingTime, setProcessingTime] = useState<number | null>(null)
  const [processingDots, setProcessingDots] = useState("")

  // Load saved items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedTransformations")
    if (saved) {
      try {
        setSavedItems(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse saved items", e)
      }
    }
  }, [])

  // Save items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("savedTransformations", JSON.stringify(savedItems))
  }, [savedItems])

  // Animated dots for processing indicator
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isProcessing) {
      interval = setInterval(() => {
        setProcessingDots((prev) => {
          if (prev.length >= 3) return ""
          return prev + "."
        })
      }, 500)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isProcessing])

  const handleProcess = async () => {
    if (!input.trim()) return

    setIsProcessing(true)
    setError(null)
    setProcessingTime(null)
    setOutput("")

    const startTime = Date.now()

    try {
      const result = await processText(input)

      const endTime = Date.now()
      setProcessingTime(endTime - startTime)

      if (result.error) {
        setError(result.error)
      } else {
        // Clean output by removing common pleasantries
        let cleanedText = result.text;
        // Remove common starting phrases
        cleanedText = cleanedText.replace(/^Hello!|Hi there!|Hey!|Greetings!|Hello,|Hi,|Hey there,|Dear user,|Hello there,|\*\*Hello\*\*|\*\*Hi\*\*|^I'm happy to help|^I'm glad to assist|How can I help you\?/gi, '').trim();
        // Remove common ending phrases
        cleanedText = cleanedText.replace(/Let me know if you have any questions\.|Feel free to ask if you need further assistance\.|I hope this helps!|Let me know if you need anything else\.|Have a great day!|Best regards,|Cheers,|Thanks for asking!|If you have any other questions, just ask\.|I'm here to help with anything else\.|\*\*Best wishes\*\*|\*\*Regards\*\* $/gi, '').trim();
        setOutput(cleanedText);
      }
    } catch (error) {
      console.error("Error processing text:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = () => {
    if (!output) return

    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    if (!input.trim() || !output.trim()) return

    const newItem: SavedItem = {
      id: Date.now().toString(),
      input,
      output,
      timestamp: Date.now(),
    }

    setSavedItems((prev) => [newItem, ...prev])
    setActiveTab("saved")
  }

  const handleDelete = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleLoad = (item: SavedItem) => {
    setInput(item.input)
    setOutput(item.output)
    setActiveTab("editor")
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="saved">Saved Transformations</TabsTrigger>
      </TabsList>

      <TabsContent value="editor" className="mt-0">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              {error.includes("API key") && (
                <div className="mt-2 text-sm">
                  <p>To fix this issue:</p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Make sure you've added your xAI API key to the XAI_API_KEY environment variable</li>
                    <li>Check that your API key is active and has sufficient credits</li>
                    <li>Verify that the API endpoint is correct for your xAI account</li>
                  </ol>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-slate-700">Input</h2>
            </div>
            <Textarea
              placeholder="Enter your project description or idea here..."
              className="min-h-[300px] mb-4 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isProcessing}
            />
            <Button onClick={handleProcess} disabled={isProcessing || !input.trim()} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing with Grok 3...
                </>
              ) : (
                "Process with Grok 3"
              )}
            </Button>
          </Card>

          <Card className="p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-slate-700">
                Cursor AI Optimized Output
                {processingTime && !isProcessing && (
                  <span className="text-xs font-normal text-slate-500 ml-2">
                    (processed in {(processingTime / 1000).toFixed(1)}s)
                  </span>
                )}
              </h2>
              <div className="flex space-x-2">
                {output && (
                  <>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={handleSave} className="h-8 px-2">
                            <Save className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save this transformation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-2">
                            {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                )}
              </div>
            </div>
            <div className="bg-slate-50 border rounded-md p-3 min-h-[300px] max-h-[300px] whitespace-pre-wrap text-slate-800 overflow-y-auto relative">
              {isProcessing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 bg-opacity-90">
                  <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-12 w-12 text-slate-500 animate-spin" />
                    <div className="flex flex-col items-center">
                      <p className="text-slate-700 font-medium">{`Grok 3 is processing${processingDots}`}</p>
                      <p className="text-slate-500 text-sm mt-1">This may take a few moments</p>
                    </div>
                  </div>
                </div>
              ) : output ? (
                output
              ) : (
                <span className="text-slate-400 italic">
                  Processed text optimized for Cursor AI will appear here...
                </span>
              )}
            </div>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="saved" className="mt-0">
        {savedItems.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No saved transformations yet.</p>
            <p className="text-sm mt-2">Process and save some text to see it here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-slate-800 truncate max-w-md">{item.input.substring(0, 50)}...</h3>
                    <p className="text-xs text-slate-500">{formatDate(item.timestamp)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleLoad(item)}>
                      Load
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-slate-600 line-clamp-2">{item.output.substring(0, 150)}...</div>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
