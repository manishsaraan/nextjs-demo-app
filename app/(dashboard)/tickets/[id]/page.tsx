import { createServerComponentClient, createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react'
import DeleteButton from './DeleteButton';

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

export async function generateMetadata({params }: { params: { id: number }}){
  const { id } = params;
  const supa = createServerComponentClient({cookies});
  const { data } = await supa.from("Tickets").select().eq("id", id).single()

  return {
    title: `Dojo Helpdesk | ${data ? data.title : "Ticket not found"} `
  }
}
export const dynamicParams = true;
// allow pages to be created ahead of time in prod
// export async function generateStaticParams(){
//     //[{id: 1}, {id: 2}]
//     const res = await fetch('http://localhost:4000/tickets/');

//     const tickets = await res.json();

//     return tickets.map((ticket:Ticket) => {
//         return {
//             id: ticket.id
//         }
//     })
// }

async function getTicket(id: string) { 
    const supa = createServerComponentClient({cookies});
    const { data } = await supa.from("Tickets").select().eq("id", id).single()
  

    if(!data){
        notFound();
        return;
    }
    

    return data;
}

export default async function TicketDetails({params}: { params:Prop}) {
    const { id } = params;
    const ticket:Ticket = await getTicket(id);

    const supa = createServerActionClient({ cookies });
    const { data }: any = await supa.auth.getSession();

    console.log(data.session.user.email,"--------", ticket.user_email)
    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
                <div className='ml-auto'>{data.session.user.email === ticket.user_email ?(
                    <DeleteButton id={ticket.id} />
                ):null}</div>
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


