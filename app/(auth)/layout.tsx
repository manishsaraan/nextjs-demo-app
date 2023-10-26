import React from 'react'
import { cookies } from 'next/headers'
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Navbar from '../components/navigation'
import Link from 'next/link'
import { redirect } from 'next/navigation';

export default async function AuthLayout(props:any) { 
    const supa = createServerComponentClient({ cookies });
    const { data }: any = await supa.auth.getSession();
  
    const { session } = data || {}; 
    if(session){
      console.log("----------user is logged in ")
      return redirect('/')
    }

    
  return (
    <>
    <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href={'/signup'}>Sign up</Link>
        <Link href={'/login'}>Login</Link>
    </nav>
      {props.children}
    </>
  )
}
