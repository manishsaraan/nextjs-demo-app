import { NextResponse } from "next/server";

export const dynamic='force-dynamic'; // make all the routes dynamic

export async function GET(){
    const resp = await fetch('http://localhost:4000/tickets');
    const data = await resp.json();

    return NextResponse.json(data,{
        status: 200
    })
}

export async function POST(response:any){
    const newTicket = await response.json();
    const res = await fetch('http://localhost:4000/tickets', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTicket)
    })

    const data = await res.json();

    return NextResponse.json(data, {
        status: 201
    })
}