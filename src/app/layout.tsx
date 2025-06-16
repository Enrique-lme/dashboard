import { ThemeProvider } from '@/context/ThemeContext'
import '@/styles/globals.css' // ← wichtig, sonst keine Tailwind-Styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}