import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {guestAdd, addingItem} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {}
    }
  }
  async componentDidMount() {
    const {data} = await axios.get(
      `/api/products/${this.props.match.params.id}`
    )
    this.setState({product: data})
  }
  addToCart(event) {
    if (!this.props.user.id) {
      if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let found = false
        // check if it exists
        // let stringifiedEvent = JSON.stringify(event)
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].id === event.id) {
            // if item is in cart
            cart[i].cartQuantity = cart[i].cartQuantity + 1
            found = true
          }
        }
        if (!found) {
          event.cartQuantity = 1
          cart.push(event)
        }
        found = false
        // if (cart.includes(stringifiedEvent)) cart.push(event)
        cart = JSON.stringify(cart)
        localStorage.setItem('cart', cart)
      } else {
        let cart = []
        event.cartQuantity = 1
        cart.push(event)
        cart = JSON.stringify(cart)
        localStorage.setItem('cart', cart)
      }
    }
    let parsedCart = JSON.parse(localStorage.getItem('cart'))
    this.props.guestAdd(parsedCart)
  }
  render() {
    const product = this.state.product
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} />
        <h2>Quantity: {product.quantity}</h2>
        <button
          type="button"
          onClick={
            !this.props.user.id
              ? () => this.addToCart(product)
              : () => this.props.userAdd(product)
          }
        >
          Add to cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    guestAdd: cart => {
      return dispatch(guestAdd(cart))
    },
    userAdd: item => {
      return dispatch(addingItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
