import React from 'react'
import Navbar from '../components/navigation'
import {  createServerActionClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout(props:any) { 
  const supa = createServerActionClient({ cookies });
  const { data }: any = await supa.auth.getSession();

  const { session } = data || {}; 
  if(!session){
    return redirect('/login')
  }
  return (
    <>
      <Navbar user={session ? session.user: null} />
      {props.children}
    </>
  )
}
