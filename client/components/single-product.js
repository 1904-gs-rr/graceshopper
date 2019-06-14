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
  addToCart(event, value) {
    if (!this.props.user.id) {
      if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let found = false
        // check if it exists
        // let stringifiedEvent = JSON.stringify(event)
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].id === event.id) {
            // if item is in cart
            cart[i].cartQuantity =
              parseInt(cart[i].cartQuantity) + parseInt(value)
            found = true
          }
        }
        if (!found) {
          event.cartQuantity = value
          cart.push(event)
        }
        found = false
        cart = JSON.stringify(cart)
        localStorage.setItem('cart', cart)
      } else {
        let cart = []
        event.cartQuantity = value
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
    let options = []
    console.log('CART QUANTITY:', product.cartQuantity)
    console.log(JSON.parse(localStorage.getItem('cart')))
    let availableBeforeCheckout
    if (this.props.user.id) {
      availableBeforeCheckout =
        parseInt(product.quantity) - parseInt(product.cartQuantity)
    } else {
      console.log('CARTCARTCART', JSON.parse(localStorage.getItem('cart')))
      // console.log('THISTHISTHISTHSI', q)s
      // availableBeforeCheckout = parseInt(product.quantity) - parseInt(q)
    }

    let selectQuantity = 10 < availableBeforeCheckout ? 10 : product.quantity
    for (let i = 0; i <= selectQuantity; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} />
        <h2>Quantity: {product.quantity}</h2>
        <select ref="productQuantity">{options}</select>
        <button
          type="button"
          onClick={
            !this.props.user.id
              ? () => this.addToCart(product, this.refs.productQuantity.value)
              : () =>
                  this.props.userAdd(product, this.refs.productQuantity.value)
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
    userAdd: (item, quantity) => {
      return dispatch(addingItem(item, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
