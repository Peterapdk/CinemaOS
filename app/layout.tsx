import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AdBlocker from '@/components/AdBlocker'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CinemaOS - Netflix-Style Movie Library',
  description: 'Discover and watch your favorite movies with CinemaOS, a Netflix-style streaming platform',
  keywords: ['movies', 'streaming', 'cinema', 'netflix', 'entertainment'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black text-white antialiased">
        <ErrorBoundary>
          <AdBlocker />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
