import { NextResponse } from "next/server";

export const dynamic='force-dynamic'; // make all the routes dynamic

export async function GET(request:any,{ params }: any){
    const {id } = params;

    const resp = await fetch('http://localhost:4000/tickets/'+id);
    if(!resp.ok){
     return NextResponse.json({ error: `can't find the ticket`},{status: 404})
    }
    
    const data = await resp.json();

    return NextResponse.json(data,{
        status: 200
    })
}

