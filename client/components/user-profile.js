import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editUserThunk} from '../store'

class UserProfile extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const first = event.target.firstName.value
    const last = event.target.lastName.value
    const email = event.target.email.value
    const password = event.target.password.value
    this.props.editUserThunk(this.props.user.id, first, last, email, password)
  }

  render() {
    const user = this.props.user
    return (
      <div>
        <h5>First name: {user.firstName}</h5>
        <h5>Last name: {user.lastName}</h5>
        <h5>Email: {user.email}</h5>
        <h5>Password: {user.password}</h5>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="lastName" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  editUserThunk: (id, firstName, lastName, email, password) =>
    dispatch(editUserThunk(id, firstName, lastName, email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
