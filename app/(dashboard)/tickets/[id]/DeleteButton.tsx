"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react'

// icons & UI
import { TiDelete } from 'react-icons/ti'

export default function DeleteIcon({ id }:any) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true)
    console.log('deleting id - ', id);
    const res = await fetch("http://localhost:3000/api/tickets/"+id, {
        method: 'delete'
    });

    const json = await res.json();


    if(json.error){
        console.log(json.error);
        setIsLoading(false);
        return;
    }


    router.refresh();
    router.push("/tickets");
  }

  return (
    <button 
      className="btn-primary" 
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading && (
        <>
          <TiDelete />
          Deleting....
        </>
      )}
      {!isLoading && (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  )
}