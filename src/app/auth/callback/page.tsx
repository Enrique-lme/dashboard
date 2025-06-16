'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')

    if (error) {
      console.error('Email-Fehler:', error)
      router.replace('/error')
    } else {
      // Optional: Analytics oder „Willkommen“-Message etc.
      router.replace('/dashboard')
    }
  }, [router, searchParams])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-500">Einen Moment, du wirst weitergeleitet …</p>
    </main>
  )
}