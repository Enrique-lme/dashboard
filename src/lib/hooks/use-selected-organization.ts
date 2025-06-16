// src/lib/hooks/use-selected-organization.ts
'use client'

import { useState, useEffect } from 'react'

export function useSelectedOrganization() {
  const [orgId, setOrgId] = useState<string | null>(null)

  useEffect(() => {
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith('selected_organization_id='))
      ?.split('=')[1]

    if (value) setOrgId(value)
  }, [])

  return orgId
}