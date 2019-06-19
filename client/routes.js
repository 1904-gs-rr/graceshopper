import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  Orders,
  OrderDetails
} from './components'
import {me} from './store'
import SingleProduct from './components/single-product'
import Cart from './components/cart'
import Checkout from './components/checkout'
import {UponSubmission} from './components/upon-submission'
import {UponGuestSubmission} from './components/upon-guest-submission'
import {UserUpdateForm} from './components/'
// import Admin from './components/admin'
// import AdminProducts from './components/adminProducts'
// import AdminUsers from './components/adminUsers'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/thanks" component={UponSubmission} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/update/:id" component={UserUpdateForm} />
        <Route path="/guestcheckout" component={UponGuestSubmission} />
        {1 && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/orders/history" component={Orders} />
            <Route
              exact
              path="/orders/history/:orderId"
              component={OrderDetails}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Redirect to="/login" />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
