'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Dashbaord = () => {
   const router = useRouter()

  return (
    <div>
        <h1>Dashbaord</h1>
        <button onClick={() => router.push('/')} className='btn btn-primary'>Go To Settings</button>
        <Link href={'/'}> Homepage </Link>
    </div>
  )
}

export default Dashbaord