import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
export default function Header() {
  return (
    <div className='header'>
           <h1>YourHR</h1>
            <Link to='/signup'><button  className='button'>Signup</button></Link>
    </div>
  )
}