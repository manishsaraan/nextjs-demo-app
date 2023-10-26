import { notFound } from 'next/navigation';
import React from 'react'

interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    user_email: string
}

interface Prop {
    id: string
}

export const dynamicParams = true;
// allow pages to be created ahead of time in prod
export async function generateStaticParams(){
    //[{id: 1}, {id: 2}]
    const res = await fetch('http://localhost:4000/tickets/');

    const tickets = await res.json();

    return tickets.map((ticket:Ticket) => {
        return {
            id: ticket.id
        }
    })
}

async function getTicket(id: string) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    
    const resp = await fetch('http://localhost:4000/tickets/'+id,{
        next: {
            revalidate: 60 // refetch in 60 seconds
        }
    });

    if(!resp.ok){
        notFound();
        return;
    }
    const data = await resp.json();

    return data;
}

export default async function TicketDetails({params}: { params:Prop}) {
    const { id } = params;
    const ticket:Ticket = await getTicket(id);

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className='card'>
                 <h3>{ticket.title}</h3>
                 <small>Created By{ticket.user_email}</small>
                 <p>{ticket.body}</p>
                 <div className={`pill ${ticket.priority}`}>{ticket.priority} Priority</div>
            </div>
        </main>
    )
}


