// src/app/dashboard/organizations/new/page.tsx
'use client'

import { useState } from 'react'

export default function CreateOrganizationPage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/organizations', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await res.json()

    if (res.ok && result.success) {
      setMessage('Organisation erfolgreich erstellt!')
      setName('')
    } else {
      setMessage('Fehler bei der Erstellung.')
    }
  }

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Neue Organisation erstellen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Organisationsname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Erstellen
        </button>
        {message && <p>{message}</p>}
      </form>
    </main>
  )
}