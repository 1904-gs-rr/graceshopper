import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Button, Form, Grid} from 'semantic-ui-react'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, cart} = props

  return (
    <Grid centered columns={3} style={{'padding-top': '4%'}}>
      <Grid.Column centered>
        <Form onSubmit={handleSubmit} name={name}>
          <Form.Field>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </Form.Field>
          <Form.Field>
            <Button type="submit">{displayName}</Button>
            <a href="/auth/google">{displayName} with Google</a>
          </Form.Field>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </Grid.Column>
    </Grid>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',

    displayName: 'Log In',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event, cart) {
      event.preventDefault()
      const formName = event.target.name
      const email = event.target.email.value
      const password = event.target.password.value
      dispatch(auth(email, password, formName, cart))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
