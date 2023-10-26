import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";

async function getTickets(){ 

    const supa = createServerComponentClient({cookies});

    const res:any = await supa.from("Tickets").select();
    console.log(res);
    const { data, error } = res;

    if(error){
      console.log(error);
      return;
    }

    return data;
}

interface Ticket {
    id: string,
    title: string,
    body: string,
    priority: string,
    user_email: string
}

export default async function TicketList() {
  const tickets:Ticket[] = await getTickets();

  console.log(tickets,"tickets")

  return (
    <>
      {tickets.length === 0 ? (<p className="text-center">There are no open tickets</p>): null}
      { tickets.map((ticket:Ticket) => (
        <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
            <div  className="card my-5">
                <h3>{ticket.title}</h3>
                <p>{ticket.body.slice(0,200)}...</p>
                <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
            </div>
        </Link>
      ))}
    </>
  )
}
