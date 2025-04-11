"use server"

export async function processText(input: string): Promise<{ text: string; error?: string }> {
  try {
    // Check if API key exists and has the correct format for xAI
    const apiKey = process.env.XAI_API_KEY

    if (!apiKey) {
      return {
        text: "",
        error: "xAI API key is missing. Please add your API key to the XAI_API_KEY environment variable.",
      }
    }

    // xAI/Grok API endpoint
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3", // Using Grok 3 model
        messages: [
          {
            role: "system",
            content: `You are an expert at reformatting and refining text to be optimized specifically for the Cursor AI IDE. Your task is to take the user's input (which may be a project description, idea, or set of requirements) and reformat it following these specific guidelines:

1. Be Specific and Clear: Transform vague requests into precise language. Use specific file names, function names, and detailed descriptions.

2. Provide Context: Ensure the request includes relevant background information about the project, framework constraints, or other important context.

3. Break Down Complex Tasks: Organize multi-step requests into numbered lists with clear, actionable items.

4. Use Examples: Where appropriate, include example code snippets or descriptions of desired outcomes.

5. Mention Files or Directories: Explicitly reference specific files or directories that need to be modified or created.

6. State the Goal: Clearly articulate the end goal of the request (e.g., performance optimization, improved readability, new feature).

7. Ask for Explanation if Needed: Include a note about whether explanations of the code or process are desired.

Maintain all the original requirements and intent from the user's input, but restructure and enhance it according to these guidelines. The output should be a well-formatted, clear, and specific request that the Cursor AI IDE can effectively interpret and execute.`,
          },
          {
            role: "user",
            content: input,
          },
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: "Unknown API error" } }))
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices[0].message.content

    return { text }
  } catch (error) {
    console.error("Error in AI processing:", error)

    // Check for specific API key errors
    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes("API key provided") || errorMessage.includes("authentication")) {
      return {
        text: "",
        error:
          "There's an issue with your xAI API key. Please make sure you've added a valid API key to the XAI_API_KEY environment variable.",
      }
    }

    if (errorMessage.includes("fetch")) {
      return {
        text: "",
        error: "Could not connect to the xAI API. Please check your internet connection and try again.",
      }
    }

    return {
      text: "",
      error: `An error occurred while processing your text: ${errorMessage}`,
    }
  }
}
