import React from 'react'
import {connect} from 'react-redux'
import {updateUsers} from '../store/user'

class UserUpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', isAdmin: false}
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
            Update Info:
            <label>Email: </label>
            <input
              name="eMail"
              type="text"
              required="true"
              email="true"
              onChange={evt => this.setState({email: evt.target.value})}
            />
            <label>is Admin: </label>
            <input
              name="isAdmin"
              type="boolean"
              onChange={evt => this.setState({isAdmin: evt.target.value})}
            />
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
