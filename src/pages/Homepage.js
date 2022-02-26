import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div>
      <Link to="/destination/:id"><p>Destinations</p></Link>
      <br></br>
      <Link to="/observation/:id"><p>Observations</p></Link>
    </div>
  )
}
