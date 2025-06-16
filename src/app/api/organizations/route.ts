import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: user } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name } = body

  // 1. Organisation einfügen + zurückgeben
  const { data: org, error: orgError } = await supabase
  .from('organizations')
  .insert([{ name, created_by: user.user?.id }])
  .select()
  .single()

if (orgError || !org?.id || !org?.name) {
  return NextResponse.json({ error: orgError?.message || 'Fehler beim Erstellen' }, { status: 500 })
}

  // 2. Beziehung zur neuen Organisation speichern
  const { error: relError } = await supabase.from('organization_users').insert([
    {
      user_id: user.user?.id!,
      organization_id: org.id,
      role: 'admin',
    },
  ])

  if (relError) {
    console.error(relError)
    return NextResponse.json({ error: relError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}