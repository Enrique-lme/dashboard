// app/auth/callback/route.ts
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })

    if (error) {
      console.error('[Supabase OTP Error]', error.message)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/error`)
    }
  }

  // ✅ Leite weiter zur UI
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirmed`)
}