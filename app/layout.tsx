import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forte Sales Calendar',
  description: 'The sales calendar for Forte Healthcare Sales team. This calendar allows the team to create and communicate their events for each day, and other things.',
}
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
<body className="pt-16">
