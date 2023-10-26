import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
export const dynamic='force-dynamic'; // make all the routes dynamic

import { cookies } from 'next/headers' 

export async function DELETE(_:any, { params }:any) {
  const id = params.id

  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.from('Tickets')
    .delete()
    .eq('id', id)

  return NextResponse.json({ error })
}


export async function GET(request:any,{ params }: any){
    const {id } = params;

    const resp = await fetch('/tickets/'+id);
    if(!resp.ok){
     return NextResponse.json({ error: `can't find the ticket`},{status: 404})
    }
    
    const data = await resp.json();

    return NextResponse.json(data,{
        status: 200
    })
}
