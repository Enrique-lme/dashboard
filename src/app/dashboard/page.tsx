// src/app/dashboard/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      redirect('/auth/login')
    }
  
    return (
      <div className="p-6 bg-background text-foreground min-h-screen">
        <h1 className="text-3xl font-semibold mb-2">👋 Willkommen im Dashboard, {user.email}</h1>
        <p className="text-muted-foreground mb-6">Nur eingeloggte User können diese Seite sehen.</p>
  
        <Link
          href="/dashboard/organizations/new"
          className="bg-foreground text-background font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          + Neue Organisation anlegen
        </Link>
      </div>
    )
  }