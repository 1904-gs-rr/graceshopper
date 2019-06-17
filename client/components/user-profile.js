import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  render() {
    const user = this.props.user
    return (
      <div>
        <form>
          <h1>{user.email}</h1>
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

export default connect(mapStateToProps)(UserProfile)
