import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'What-ToDo',
    description: 'A simple app to keep track of tasks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/icon.png" type="image/icon" sizes="any" />
            </head>

            <body className="bg-[#010101] text-zinc-300">{children}</body>
        </html>
    )
}
