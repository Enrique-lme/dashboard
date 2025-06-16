'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { login, signup } from '@/app/auth/login/actions'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [actionType, setActionType] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      if (actionType === 'login') {
        await login(formData)
      } else {
        await signup(formData)
      }
    } catch (err: any) {
      setError(err.message || 'Unbekannter Fehler')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 relative overflow-hidden select-none">

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-md w-full bg-card/60 backdrop-blur-[24px] border border-white/20 rounded-2xl p-8 shadow-sm shadow-black/40"
      >
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck size={24} className="text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Login bei NEXTPROZESS</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block mb-2 text-xs font-medium text-muted-foreground uppercase">
              E-Mail-Adresse
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="deine@email.com"
                required
                className="w-full rounded-lg border border-white/20 bg-input/60 pl-12 pr-4 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Passwort */}
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-xs font-medium text-muted-foreground uppercase">
              Passwort
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-white/20 bg-input/60 pl-12 pr-12 py-3 text-sm text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition"
                aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="mt-2 text-right">
              <a href="#" className="text-xs text-muted-foreground hover:underline">
                Passwort vergessen?
              </a>
            </div>
          </div>

          {/* Fehler */}
          {error && <p className="text-xs text-red-400">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              onClick={() => setActionType('login')}
              disabled={loading}
              className="flex-1 rounded-lg bg-white text-black font-semibold py-3 text-sm hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && actionType === 'login' ? 'Lädt...' : 'Einloggen'}
            </button>
            <button
              type="submit"
              onClick={() => setActionType('signup')}
              disabled={loading}
              className="flex-1 rounded-lg border border-white/20 bg-white/10 text-white font-semibold py-3 text-sm hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && actionType === 'signup' ? 'Lädt...' : 'Registrieren'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}