import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'
import {NavLink} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    return (
      <div>
        <h1>Products in Cart:</h1>
        {this.props.cart.map(product => {
          return (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imageUrl} />
            </div>
          )
        })}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      return dispatch(getCart())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
