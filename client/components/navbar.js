import React from 'react'
import PropTypes from 'prop-types'
import {Menu, Segment, Header, Grid, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div style={{height: 100}}>
    <Grid
      verticalAlign="middle"
      textAlign="center"
      style={{'padding-top': '1%'}}
    >
      <h1
        as="h1"
        textAlign="center"
        style={{
          'padding-top': '2%',
          'font-family': 'Papyrus',
          'font-size': '300%'
        }}
      >
        YourWorld Industries
      </h1>
    </Grid>
    {isLoggedIn ? (
      <Header>
        {/* The navbar will show these links after you log in */}
        <div className="ui left aligned one column grid">
          <Link className="ui button" to="/home">
            Home
          </Link>
          <Link className="ui button" to="/cart">
            See Cart
          </Link>
          <Button className="ui button" href="#" onClick={handleClick}>
            Logout
          </Button>
        </div>
      </Header>
    ) : (
      <Header>
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
      </Header>
    )}
    <hr />
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
