import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import AllProducts from './all-products'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName} = props

  return (
    <div>
      <AllProducts />
      <h3 style={{'padding-left': '1%'}}>
        Welcome, {email} {firstName} {lastName}
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string
}
