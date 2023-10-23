import React from 'react';
import Link from 'next/link';
import ProductCard from './components/ProductCard'

interface User {
  id: number,
  name : string
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users",{
    next: {
      revalidate: 10
    }
  });
  const users: User[] = await res.json();


  return (
    <div>
      <h1>All users</h1>
      <div className='btn btn-primary'>
        <button>Add to Cart</button>
      </div>
      <div className='p-1 my-5 bg-sky-200 text-white text-xl hover:bg-sky-500'>
             tailwind
      </div>
      <ProductCard/>
      <Link href={'/components/'}>Product</Link>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user:User, key: number) =>  (
          <li key={key}>
          {user.name}
         </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersPage