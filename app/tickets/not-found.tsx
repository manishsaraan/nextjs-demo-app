import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='text-center'>
        <h2 className='text-3x1'>There was a problem</h2>
        <p>We coulnt find the page you are looking for</p>
        <p>Got to <Link href={'/tickets'}>Homepage</Link></p>
    </div>
  )
}
