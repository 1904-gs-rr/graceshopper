import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
import {NavLink} from 'react-router-dom'
import {guestAdd} from '../store/cart'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }
  addToCart(event) {
    if (!this.props.user.id) {
      if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'))

        cart.push(event)
        cart = JSON.stringify(cart)
        localStorage.setItem('cart', cart)
      } else {
        let cart = []
        cart.push(event)
        cart = JSON.stringify(cart)
        localStorage.setItem('cart', cart)
      }
    }
    let parsedCart = JSON.parse(localStorage.getItem('cart'))
    console.log(parsedCart)
    this.props.guestAdd(parsedCart)
  }
  render() {
    return (
      <div>
        <h1>All Products</h1>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <NavLink to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
              </NavLink>
              <img src={product.imageUrl} />
              <p>Quantity: {product.quantity}</p>
              <p>Price: $ {product.price}</p>
              <button onClick={() => this.addToCart(product)}>
                Add to cart
              </button>
            </div>
          )
        })}
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
    getProducts: () => {
      return dispatch(getProducts())
    },
    guestAdd: cart => {
      return dispatch(guestAdd(cart))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
