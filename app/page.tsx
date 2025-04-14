import { TextFormatter } from "@/components/text-formatter"
import { ApiKeyInfo } from "@/components/api-key-info"
import { Footer } from "@/components/footer"
import { AI_MODEL } from '@/app/actions'

export default function Home() {
  // Check if API key exists
  const apiKeyExists = !!process.env.XAI_API_KEY;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-grow">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">PromptCraft for Cursor AI</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Transform your ideas and project descriptions into well-structured formats following best practices for
            effective communication with Cursor AI IDE.
          </p>
        </div>

        {apiKeyExists ? (
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">AI Status:</span>
              <div className="relative flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <div className="absolute h-2.5 w-2.5 rounded-full bg-green-500 animate-ping" />
                <span className="ml-2 text-sm text-slate-700">Online - {AI_MODEL}</span>
              </div>
            </div>
          </div>
        ) : (
          <ApiKeyInfo />
        )}

        <TextFormatter />
      </div>

      <Footer />
    </main>
  )
}
