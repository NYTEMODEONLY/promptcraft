import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PromptCraft for Cursor AI",
  description: "Transform your ideas into well-structured prompts for Cursor AI IDE",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body className={`${inter.className} h-full overflow-auto`}>{children}</body>
    </html>
  )
}


import './globals.css'