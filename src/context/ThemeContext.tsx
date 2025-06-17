// src/context/ThemeContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Initial aufheben: prüfe localStorage oder System-Vorgabe
  useEffect(() => {
    setMounted(true)
    const saved = (localStorage.getItem('theme') as Theme) || (
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    )
    setTheme(saved)
  }, [])

  // Klasse am <html> aktualisieren, sobald theme oder mounted sich ändert
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  // Einfache Toggle-Funktion: nur light ↔️ dark
  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  // Solange wir noch nicht gemountet haben, verbergen wir das UI,
  // liefern aber trotzdem den Provider, damit useTheme nicht crasht.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: 'hidden' }}>{children}</div>
      )}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}