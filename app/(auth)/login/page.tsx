"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"

// components
import AuthForm from "../AuthForm"

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')
 

  const handleSubmit = async (e:any, email:any, password:any) => {
    e.preventDefault()
    setError('')

    const supabase = createClientComponentClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setError(error.message)
    }
    if (!error) {
      router.push('/tickets')
    } 

  }
[]
  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit} />

      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}