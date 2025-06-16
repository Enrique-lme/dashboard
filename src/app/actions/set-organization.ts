'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function setSelectedOrganization(formData: FormData) {
  const orgId = formData.get('organization') as string

  if (!orgId) {
    throw new Error('Organization ID fehlt')
  }

  const response = NextResponse.redirect('/dashboard')
  response.cookies.set('selected_organization_id', orgId, {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  })

  return response
}