
import { ReactNode } from 'react'
import { createClient } from '@/utils/supabase/server'
import ClientLayout from '@/components/dashboard/ClientLayout'

interface OrganizationRow {
  organizations: {
    id: string
    name: string
  } | null
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('organization_users')
    .select('organizations(id, name)')
    .eq('user_id', user?.id)

  const organizations = (data as OrganizationRow[] | null)
    ?.map((o) => o.organizations)
    .filter((o): o is NonNullable<typeof o> => !!o) || []

  return (
    <div className="flex h-screen bg-card/50 backdrop-blur-lg text-foreground">
      <ClientLayout organizations={organizations}>
        <main className="flex-1 overflow-y-auto px-6 py-6 rounded-tl-3xl shadow-inner bg-card/70">
          {children}
        </main>
      </ClientLayout>
    </div>
  )
}