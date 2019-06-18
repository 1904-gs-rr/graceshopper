import React from 'react'
import PropTypes from 'prop-types'
import {Menu, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 className="padded">Welcome to YourWorld</h1>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <div className="ui left aligned one column grid">
          <Link className="ui button" to="/home">
            Home
          </Link>
          <Link className="ui button" to="/cart">
            See Cart
          </Link>
          <a className="ui button" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      </div>
    ) : (
      <div className="ui center aligned one column grid">
        {/* The navbar will show these links before you log in */}
        <Link className="ui button" to="/login">
          Login
        </Link>
        <Link className="ui button" to="/signup">
          Sign Up
        </Link>
        <Link className="ui button" to="/products">
          See Products
        </Link>
        <Link className="ui button" to="/cart">
          See Cart
        </Link>
      </div>
    )}
    <p />
    <hr className="bloop" />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
