import React from 'react'
import Navbar from '../components/navigation'
import Link from 'next/link'

export default function AuthLayout(props:any) {
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
