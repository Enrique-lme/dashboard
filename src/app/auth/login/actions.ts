'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// src/app/auth/login/actions.ts

export async function signup(formData: FormData) {
    const supabase = await createClient()
  
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    if (!data.email || !data.password || data.password.length < 6) {
      redirect('/error')
    }
  
    const { data: result, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      })
    
    console.log('SIGNUP RESULT:', result)
    console.log('SIGNUP ERROR:', error)

    if (error) {
      console.error('Signup error:', error.message)
      redirect('/error')
    }
  
    redirect('/auth/check-email') // Seite anzeigen: "Bitte E-Mail bestätigen"
    
  }
  

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }