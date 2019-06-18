import React from 'react'
import {connect} from 'react-redux'
import {updateUsers} from '../store/user'

class UserUpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {firstName: '', lastName: '', email: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUsers(this.state, this.props.match.params.id)
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <ul>
            Update Your Contact Info!
            <div>
              <label> First Name: </label>
              <input
                name="first"
                type="text"
                onChange={evt => this.setState({first: evt.target.value})}
              />
              <label>Last Name: </label>
              <input
                name="last"
                type="text"
                onChange={evt => this.setState({last: evt.target.value})}
              />
              <label>Email: </label>
              <input
                name="eMail"
                type="email"
                email="true"
                onChange={evt => this.setState({email: evt.target.value})}
              />
              {/* <label>Password: </label> */}
              {/* <input
                name="password"
                type="password"
                required="true"
                onChange={evt => this.setState({password: evt.target.value})}
              /> */}
              {/* <label>is Admin: </label>
            <input
              name="isAdmin"
              type="boolean"
              onChange={evt => this.setState({isAdmin: evt.target.value})}
            /> */}
            </div>
            <button
              type="submit"
              onClick={evt => {
                this.handleSubmit(evt)
              }}
            >
              Submit
            </button>
          </ul>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateUsers: (state, userId) => dispatch(updateUsers(state, userId))
})

export default connect(null, mapDispatchToProps)(UserUpdateForm)
