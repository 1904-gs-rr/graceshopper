import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Button, Grid} from 'semantic-ui-react'

import {guestAdd, addingItem, getCart} from '../store/cart'

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
    if (this.props.user.id) {
      this.props.getCart()
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'))
      this.props.guestAdd(cart)
    }
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
            cart[i].cartQuantity = +cart[i].cartQuantity + +value
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
    let availableBeforeCheckout

    if (this.props.cart) {
      let [cartItem] = this.props.cart.filter(item => {
        return product.name === item.name
      })
      console.log(cartItem)
      if (cartItem) {
        availableBeforeCheckout = +cartItem.quantity - +cartItem.cartQuantity
        console.log(typeof cartItem.quantity, typeof cartItem.cartQuantity)
      }
    }

    let selectQuantity =
      availableBeforeCheckout !== undefined
        ? availableBeforeCheckout
        : product.quantity
    // let selectQuantity =
    //   availableBeforeCheckout > 10 ? 10 : availableBeforeCheckout
    for (let i = 0; i <= selectQuantity; i++) {
      options.push(
        <option key={i} value={i} className="dropdown-item">
          {i}
        </option>
      )
    }
    return (
      <div
        className="ui center aligned one column grid"
        style={{'padding-top': '4%'}}
      >
        <div className="ui center aligned one column grid">
          <div>
            <h1 style={{display: 'flex', justifyContent: 'space-around'}}>
              {product.name}
            </h1>
          </div>
          <img src={product.imageUrl} />
          <h2>In stock: {product.quantity}</h2>
          <div>
            <Button
              size="large"
              type="button"
              onClick={
                !this.props.user.id
                  ? () =>
                      this.addToCart(product, +this.refs.productQuantity.value)
                  : () =>
                      this.props.userAdd(
                        product,
                        +this.refs.productQuantity.value
                      )
              }
            >
              Add to cart
            </Button>
            <div className="ui compact menu">
              <div>
                <select
                  className="ui item simple dropdown"
                  ref="productQuantity"
                >
                  {options}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    guestAdd: cart => {
      return dispatch(guestAdd(cart))
    },
    userAdd: (item, quantity) => {
      return dispatch(addingItem(item, quantity))
    },
    getCart: () => {
      return dispatch(getCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
