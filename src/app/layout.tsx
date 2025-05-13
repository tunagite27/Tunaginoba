import { Inter } from 'next/font/google'
import Header from './components/header'
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tunaginoba',
  description: '地域に根ざし、人にフォーカスしたカタログメディア',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
