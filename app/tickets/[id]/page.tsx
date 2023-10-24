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

async function getTicket(id: string) {
    const resp = await fetch('http://localhost:4000/tickets/'+id,{
        next: {
            revalidate: 0 // refetch in 30 seconds
        }
    });
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


