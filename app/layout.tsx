import type { Metadata } from 'next'
import './globals.css'
import AdBlocker from '@/components/AdBlocker'

export const metadata: Metadata = {
  title: 'CinemaOS',
  description: 'Netflix-style media library app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AdBlocker />
        {children}
      </body>
    </html>
  )
}
