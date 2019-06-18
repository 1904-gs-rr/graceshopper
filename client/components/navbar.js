import React from 'react'
import PropTypes from 'prop-types'
import {Menu, Segment, Header, Grid, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div style={{height: 100}}>
    <Grid
      centered
      columns={3}
      verticalAlign="middle"
      // textAlign="center"
      style={{'padding-top': '1%'}}
    >
      {isLoggedIn ? (
        <Grid.Column style={{'padding-left': '4%'}}>
          <Header>
            {/* The navbar will show these links after you log in */}
            <div
              className="ui left aligned one column grid"
              style={{'padding-top': '5%'}}
            >
              <Link className="ui button" to="/home">
                Home
              </Link>
              <Link className="ui button" to="/cart">
                See Cart
              </Link>
              <Link className="ui button" to="/orders/history">
                Orders
              </Link>
              <Button className="ui button" href="#" onClick={handleClick}>
                Logout
              </Button>
            </div>
          </Header>
        </Grid.Column>
      ) : (
        <Grid.Column>
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
        </Grid.Column>
      )}
      <Grid.Column>
        <h1
          as="h1"
          textAlign="center"
          style={{
            'padding-top': '2%',
            'font-family': 'Papyrus',
            'font-size': '300%',
            'text-align': 'center'
          }}
        >
          YourWorld Industries
        </h1>
      </Grid.Column>
      <Grid.Column />
    </Grid>
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
      localStorage.setItem('cart', '[]')
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
