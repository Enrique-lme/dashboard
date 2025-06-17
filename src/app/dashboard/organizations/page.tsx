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

  const organizations = data as unknown as OrganizationUser[]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Organisationen</h1>
        <Link
          href="/dashboard/organizations/new"
          className="bg-card-foreground text-card px-4 py-2 rounded-lg shadow hover:shadow-md transition"
        >
          + Neue Organisation anlegen
        </Link>
      </div>

      {/* Grid mit responsiven Spalten */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map(({ organization }) => (
          <Link
            key={organization.id}
            href={`/dashboard/organizations/${organization.id}`}
            className="
              group block rounded-2xl 
              border border-border 
              bg-card 
              p-6 
              shadow 
              transition 
              hover:border-foreground 
              hover:bg-card-foreground/5
            "
          >
            {/* Name */}
            <h2 className="
              text-lg font-semibold text-foreground 
              group-hover:text-primary 
              mb-2
            ">
              {organization.name}
            </h2>

            {/* ID */}
            <p className="text-sm text-muted-foreground mb-1 break-all">
              ID: {organization.id}
            </p>

            {/* Datum */}
            <p className="text-sm text-muted-foreground">
              Erstellt am:{' '}
              {new Date(organization.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}