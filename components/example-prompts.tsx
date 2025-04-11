"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Lightbulb } from "lucide-react"

type ExamplePrompt = {
  title: string
  description: string
  prompt: string
}

const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    title: "Feature Implementation",
    description: "Adding user authentication to a web app",
    prompt: `I need to implement user authentication in my React application. 

Goal: Create a secure login and registration system with email verification.

Context: This is a Next.js application using the App Router. We're using Prisma with PostgreSQL for the database.

Specific tasks:
1. Create an authentication API in \`app/api/auth/[...nextauth]/route.ts\` using NextAuth.js
2. Implement a login form component in \`components/auth/login-form.tsx\` with email and password fields
3. Create a registration form in \`components/auth/register-form.tsx\` with email, password, and password confirmation
4. Add a forgot password flow with email reset functionality
5. Update the database schema in \`prisma/schema.prisma\` to include the necessary user fields

The authentication should follow OAuth standards and include proper error handling for invalid credentials. I'd like explanations for any security best practices implemented.

Example of desired login form behavior: When a user enters incorrect credentials, the form should display a specific error message without revealing whether the email or password was incorrect.`,
  },
  {
    title: "Bug Fix Request",
    description: "Fixing a data fetching issue in a React component",
    prompt: `I need help fixing a bug in my data fetching logic in my React component.

Goal: Fix the infinite re-rendering issue when fetching data from an API.

Context: This is a React application using React Query for data fetching. The component is supposed to fetch user data once when mounted.

Files involved:
- \`src/components/UserProfile.tsx\` - The component with the issue
- \`src/hooks/useUser.ts\` - Custom hook for fetching user data

The problem: When the UserProfile component renders, it enters an infinite loop of re-renders and API calls. I suspect it's related to how I'm using the useUser hook or how dependencies are set up in useEffect.

Here's the current implementation of UserProfile.tsx:
\`\`\`tsx
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

export const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const { fetchUser } = useUser();
  
  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUser(userId);
      setUserData(data);
    };
    getUserData();
  });
  
  if (!userData) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
    </div>
  );
};
\`\`\`

Please explain what's causing the issue and how to fix it properly.`,
  },
  {
    title: "Code Refactoring",
    description: "Refactoring a complex function for better performance",
    prompt: `I need to refactor a complex data processing function to improve its performance.

Goal: Optimize the function to handle large datasets more efficiently and improve readability.

Context: This is part of a data visualization dashboard built with React and D3.js. The function processes time series data before rendering charts.

File: \`src/utils/dataProcessing.js\`

Current implementation:
\`\`\`javascript
function processTimeSeriesData(rawData) {
  let result = [];
  for (let i = 0; i < rawData.length; i++) {
    let item = rawData[i];
    let date = new Date(item.timestamp);
    let formattedDate = date.toISOString().split('T')[0];
    
    let existingEntry = null;
    for (let j = 0; j < result.length; j++) {
      if (result[j].date === formattedDate) {
        existingEntry = result[j];
        break;
      }
    }
    
    if (existingEntry) {
      existingEntry.value += item.value;
      existingEntry.count += 1;
    } else {
      result.push({
        date: formattedDate,
        value: item.value,
        count: 1
      });
    }
  }
  
  for (let i = 0; i < result.length; i++) {
    result[i].average = result[i].value / result[i].count;
  }
  
  return result.sort((a, b) => new Date(a.date) - new Date(b.date));
}
\`\`\`

The function needs to handle datasets with up to 100,000 entries. Currently, it becomes very slow with large datasets. Please refactor this function to be more efficient and readable, using modern JavaScript features. Also, please explain the performance improvements in your solution.`,
  },
]

export function ExamplePrompts({ onSelectExample }: { onSelectExample: (prompt: string) => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          <span>Example Prompts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Example Prompts</DialogTitle>
          <DialogDescription>
            Select an example to use as a starting point for your project description.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          <div className="space-y-4 pr-4">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer"
                onClick={() => onSelectExample(example.prompt)}
              >
                <h3 className="font-medium text-slate-800">{example.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{example.description}</p>
                <p className="text-xs text-slate-500 line-clamp-2">{example.prompt.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
