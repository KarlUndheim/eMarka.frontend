import React from 'react'
import Link from "next/link"

export default function Homepage() {
  return (
    
    <div>
      <Link href={"/destination/:id"}><p>Destinations</p></Link>
      <br></br>
      <Link href={"/observation/:id"}><p>Observations</p></Link>
    </div>
    
  )
}
