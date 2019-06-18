// import React from 'react'
// import {connect} from 'react-redux'
// import {updateUser} from '../store'

// class AdminUser extends React.Component {
//   constructor(props) {
//     super()
//     this.state = {email: '', isAdmin: false}
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit(evt) {
//     evt.preventDefault()
//     this.props.updateUser(this.state)
//   }

//   render() {
//     return (
//       <form className="form" onSubmit={this.handleSubmit}>
//         <ul>
//           Update Info:
//           <label>Email: </label>
//           <input
//             name="eMail"
//             type="text"
//             required="true"
//             onChange={evt => this.setState({email: evt.target.value})}
//           />
//           <label>is Admin: </label>
//           <input
//             name="isAdmin"
//             type="boolean"
//             onChange={evt => this.setState({isAdmin: evt.target.value})}
//           />
//           <button
//             type="submit"
//             onClick={evt => {
//               this.handleSubmit(evt)
//             }}
//           >
//             Submit
//           </button>
//         </ul>
//       </form>
//     )
//   }
// }
// const mapDispatchToProps = dispatch => ({
//   updateUser: state => dispatch(updateUser(state))
// })

// export default connect(null, mapDispatchToProps)(AdminUser)
