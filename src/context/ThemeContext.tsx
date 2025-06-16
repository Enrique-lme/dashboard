'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  // Nur auf dem Client laden
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    setTheme(saved ?? (prefersDark ? 'dark' : 'light'))
  }, [])

  // Theme-Klasse auf <html> setzen
  useEffect(() => {
    if (!theme) return

    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    if (!theme) return
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme: theme ?? 'dark', toggleTheme }}>
      {/* erst rendern, wenn Theme gesetzt */}
      {theme && children}
    </ThemeContext.Provider>
  )
}