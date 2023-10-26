import React from 'react'
import Navbar from '../components/navigation'

export default function DashboardLayout(props:any) {
  return (
    <>
      <Navbar/>
      {props.children}
    </>
  )
}
