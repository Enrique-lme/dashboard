'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ConfirmedPage() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/auth/login') // nach 2 Sekunden zur Login-Seite
    }, 2000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600">✅ Deine E-Mail wurde bestätigt!</h1>
        <p>Du wirst gleich weitergeleitet...</p>
      </div>
    </main>
  )
}