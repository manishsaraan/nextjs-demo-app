import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic='force-dynamic'; // make all the routes dynamic

// export async function GET(){
//     const resp = await fetch('http://localhost:4000/tickets');
//     const data = await resp.json();

//     return NextResponse.json(data,{
//         status: 200
//     })
// }

// export async function POST(response:any){
//     const newTicket = await response.json();
//     const res = await fetch('http://localhost:4000/tickets', {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(newTicket)
//     })

//     const data = await res.json();

//     return NextResponse.json(data, {
//         status: 201
//     })
// }


export async function POST(response:any){ 
    const ticket = await response.json();

    // get supabase
    const supa = createRouteHandlerClient({cookies});

    // get the current user session

    const { data: { session } } = await supa.auth.getSession();

    // insert the data

    console.log(ticket,"ticket")
    console.log(session?.user?.email,"session?.user?.email")

    const { data, error } = await supa.from("Tickets").insert({
        ...ticket,
        user_email: session?.user?.email
    }).select().single();
 

    return NextResponse.json({data, error})
}