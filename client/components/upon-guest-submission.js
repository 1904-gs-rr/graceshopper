import React from 'react'
import {NavLink} from 'react-router-dom'
import {Login} from './auth-form'

export const UponGuestSubmission = props => {
  return (
    <div>
      <h1>Please log in to make a purchase</h1>
      <Login />
      <NavLink to="/home">Go home</NavLink>
    </div>
  )
}
