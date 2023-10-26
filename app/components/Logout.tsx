"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {  useRouter } from 'next/navigation';
import React from 'react'

export default function Logout() {
  const router = useRouter();

  const logout = async () => {
    const supa = createClientComponentClient();
    const { error } = await supa.auth.signOut();

    if(!error){
        router.push("/");
        return;
    }

    console.log(error)
  }
  return (
    <div>
        <button onClick={logout} className='btn btn-primary'>Logout</button>
    </div>
  )
}
