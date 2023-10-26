import React, { Suspense } from 'react'
import Link from 'next/link'
import TicketList from './TicketList'
import Loading from './loading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your tickets',
  description: 'here is a list of all the tickets',
}

export default function Tickets() {
  return ( 
   <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p><small>Currently open tickets.</small></p>
        </div>
        <Link href="/tickets/create" className="ml-auto">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}
