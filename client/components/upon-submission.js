import React from 'react'
import {NavLink} from 'react-router-dom'

export const UponSubmission = props => {
  return (
    <div>
      <h1>Thank you for your purchase!!!!</h1>
      <NavLink to="/home">Go home</NavLink>
    </div>
  )
}
