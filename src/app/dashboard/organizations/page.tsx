// src/app/dashboard/organizations/page.tsx

import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface Organization {
  id: string
  name: string
  created_at: string
}

interface OrganizationUser {
  organization: Organization
}

export default async function OrganizationOverviewPage() {
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    redirect('/auth/login')
  }

  const { data, error } = await supabase
    .from('organization_users')
    .select('organization:organizations ( id, name, created_at )')
    .eq('user_id', userData.user.id)

  if (error || !data) {
    console.error(error)
    return <div className="p-6">Fehler beim Laden der Organisationen.</div>
  }

  // TypeScript zwingen, diesen Typ zu akzeptieren
  const organizations = data as unknown as OrganizationUser[]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Organisationen</h1>
        <Link
          href="/dashboard/organizations/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Neue Organisation anlegen
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {organizations.map((entry) => (
    <Link
      key={entry.organization.id}
      href={`/dashboard/organizations/${entry.organization.id}`}
      className="group rounded-xl border border-[#2a2a2d] bg-[#151517] p-5 transition hover:border-[#4C5FD5] hover:bg-[#1c1c1f]"
    >
      <h2 className="text-lg font-semibold text-white group-hover:text-[#4C5FD5] mb-1">
        {entry.organization.name}
      </h2>
      <p className="text-sm text-gray-400 mb-1 break-all">
        ID: {entry.organization.id}
      </p>
      <p className="text-sm text-gray-500">
        Erstellt am:{' '}
        {new Date(entry.organization.created_at).toLocaleDateString()}
      </p>
    </Link>
  ))}
</div>
    </div>
  )
}