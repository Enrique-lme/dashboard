'use client'

import { useSelectedOrganization } from '@/lib/hooks/use-selected-organization'
import { useEffect, useState } from 'react'

type Organization = {
  id: string
  name: string
}

export function OrganizationSwitcher({ organizations }: { organizations: Organization[] }) {
  const selected = useSelectedOrganization()
  const [value, setValue] = useState<string | undefined>()

  useEffect(() => {
    if (selected) setValue(selected)
  }, [selected])

  return (
    <form action="/app/actions/set-organization" method="post">
      <select
        name="organization"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          e.currentTarget.form?.requestSubmit()
        }}
        className="bg-gray-900 text-white p-2 rounded border border-gray-700"
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
    </form>
  )
}