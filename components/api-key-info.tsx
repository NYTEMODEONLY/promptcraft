import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ApiKeyInfo() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>xAI API Key Setup Required</CardTitle>
        <CardDescription>PromptCraft requires an xAI/Grok API key to function properly.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>To use PromptCraft, you need to set up your xAI API key as an environment variable. Follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Sign up for an xAI account and obtain your API key</li>
            <li>
              Add this key as an environment variable named{" "}
              <code className="bg-slate-100 px-1 py-0.5 rounded">XAI_API_KEY</code> in your Vercel project settings
            </li>
            <li>Redeploy your application after adding the environment variable</li>
          </ol>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 font-medium">Important:</p>
            <p className="text-amber-700 text-sm mt-1">
              The XAI_API_KEY environment variable has been added to your project, but you may need to add the actual
              API key value.
            </p>
          </div>
          <p className="text-sm text-slate-600 mt-4">
            Note: Keep your API key secure and never share it publicly. xAI may charge based on usage, so monitor your
            usage to avoid unexpected charges.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
