// src/app/dashboard/organizations/[id]/users/page.tsx

import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

interface OrganizationUser {
  id: string
  role: string
  users: {
    email: string
  } | null
}

export default async function OrganizationUsersPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('organization_users')
    .select('id, role, users(email)')
    .eq('organization_id', params.id)

  if (error) {
    console.error(error)
    return <div className="p-6">Fehler beim Laden der Benutzer.</div>
  }

  // Explizit sicherstellen, dass `users` ein Objekt ist (nicht ein Array)
  const users = (data ?? []).map((entry) => ({
    ...entry,
    users: Array.isArray(entry.users) ? entry.users[0] : entry.users,
  })) as OrganizationUser[]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Benutzer dieser Organisation</h1>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th className="py-2">Benutzer</th>
            <th className="py-2">Rolle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((entry) => (
            <tr key={entry.id} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="py-2">{entry.users?.email ?? 'Unbekannt'}</td>
              <td className="py-2 capitalize">{entry.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        href={`/dashboard/organizations/${params.id}`}
        className="inline-block mt-6 text-sm text-blue-400 hover:underline"
      >
        Zurück zur Organisation
      </Link>
    </div>
  )
}