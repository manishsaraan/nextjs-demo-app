import Link from "next/link";

async function getTickets(){ 

    const resp = await fetch('http://localhost:4000/tickets',{
        next: {
            revalidate: 0 // refetch in 30 seconds
        }
    });
    const data = await resp.json();

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
