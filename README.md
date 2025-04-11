# PromptCraft for Cursor AI

PromptCraft is a specialized tool designed to transform your ideas and project descriptions into well-structured formats optimized for the Cursor AI IDE. By leveraging the power of Grok 3, this application helps developers create more effective prompts that follow best practices for AI-assisted development.

![PromptCraft Screenshot](public/placeholder.svg)

## Features

- **AI-Powered Prompt Refinement**: Transform vague ideas into clear, structured prompts
- **Cursor AI Optimization**: Specifically tailored for the Cursor AI IDE
- **Real-time Processing**: Visual feedback during AI processing
- **Save & Manage Prompts**: Store your refined prompts for future use
- **Copy to Clipboard**: Easily transfer optimized prompts to Cursor AI

## How It Works

1. **Input Your Idea**: Enter your project description or development request
2. **AI Processing**: Grok 3 analyzes and restructures your input
3. **Optimized Output**: Receive a well-formatted prompt following best practices
4. **Use in Cursor AI**: Copy the refined prompt directly into Cursor AI IDE

## Best Practices Implemented

PromptCraft structures your prompts following these guidelines:

- **Specificity and Clarity**: Transforms vague requests into precise language with specific file names and function details
- **Context Provision**: Ensures background information about the project and constraints are included
- **Task Breakdown**: Organizes multi-step requests into clear, numbered lists
- **Examples**: Includes code snippets or descriptions where appropriate
- **File References**: Explicitly mentions files or directories that need modification
- **Goal Clarity**: Articulates the end goal of the request (performance, readability, etc.)
- **Explanation Requests**: Indicates when explanations of code or processes are desired

## Technical Details

- **Frontend**: Next.js with React and TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: xAI/Grok 3 API
- **Deployment**: Vercel

## Setup Requirements

### Prerequisites

- Node.js 18+ and npm/yarn
- xAI API key

### Environment Variables

The application requires the following environment variable:

- `XAI_API_KEY`: Your xAI/Grok API key

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/NYTEMODEONLY/promptcraft.git
   cd promptcraft
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your xAI API key: `XAI_API_KEY=your_api_key_here`

4. Start the development server:
   ```bash
   pnpm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the application running.

## Usage

1. Enter your project idea or development request in the input field.
2. Watch as Grok 3 processes and refines your prompt in real-time.
3. Review the optimized output following best practices for Cursor AI.
4. Copy the refined prompt to clipboard or save it for future use.
5. Paste the prompt into Cursor AI IDE for enhanced AI assistance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE). 