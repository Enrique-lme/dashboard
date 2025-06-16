'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient() // ← das ist der wichtige Fix
  await supabase.auth.signOut()
  redirect('/auth/login')
}