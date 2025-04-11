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
    <html lang="en">
      <head>
        <link rel="icon" href="/placeholder-logo.png" type="image/png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


import './globals.css'