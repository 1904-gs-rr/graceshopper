import React from 'react'
import {NavLink} from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <NavLink to="admin/users">Edit Users</NavLink>
      <NavLink to="admin/products">Edit Products</NavLink>
    </div>
  )
}
export default Admin
