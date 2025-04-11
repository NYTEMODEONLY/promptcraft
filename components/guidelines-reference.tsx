import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export function GuidelinesReference() {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-3 text-slate-800">Prompting Guidelines</h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm font-medium">Be Specific and Clear</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-600">
              Use precise language to describe what you want. If you're looking for code changes, specify the
              functionality or bug you're addressing. For example, instead of saying "fix my code," say "modify the
              login function in `auth.js` to handle incorrect password errors by displaying a user-friendly message."
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm font-medium">Provide Context</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-600">
              Give a brief background if the task is part of a larger project or has specific constraints. For instance,
              mention if the code must adhere to a particular framework or style guide.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm font-medium">Break Down Complex Tasks</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-600">
              If your request involves multiple steps, list them out. This helps tackle each part systematically. For
              example:
            </p>
            <ol className="list-decimal list-inside mt-2 text-sm text-slate-600 space-y-1">
              <li>Add a new endpoint in `api.py` for user registration.</li>
              <li>Update the database schema in `schema.sql` to include a new table for user preferences.</li>
              <li>Write a test case in `test_api.py` to verify the endpoint.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-sm font-medium">Use Examples</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-600">
              If you have a particular output or style in mind, provide an example. This could be a snippet of code or a
              description of the desired result.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-sm font-medium">Mention Files or Directories</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-600">
              If your request relates to specific files or directories, name them explicitly. This helps target searches
              or edits accurately.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-sm font-medium">State Your Goal</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-600">
              Let me know the end goal of your request. Understanding whether you're optimizing for performance,
              readability, or a specific feature helps tailor responses.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="text-sm font-medium">Ask for Explanation if Needed</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-600">
              If you want to understand the reasoning or the code provided, just ask. I'm happy to explain the thought
              process.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
