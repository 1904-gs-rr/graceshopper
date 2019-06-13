import React from 'react'
import {connect} from 'react-redux'
import {getCart, guestAdd} from '../store/cart'
import {NavLink} from 'react-router-dom'
class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCart()
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (cart === null) {
        cart = []
      }
      this.props.guestAdd(cart)
    }
  }
  render() {
    // const unique = function(array) {
    //   console.log('I AM IN HERE!!!')
    //   let arr = []
    //   arr.push(array[0])
    //   for (let i = 1; i < array.length; i++) {
    //     let isIn = false
    //     for (let j = 0; j <= arr.length; j++) {
    //       isIn = false
    //       if (array[i].id === arr[j].id) {
    //         isIn = true
    //       }
    //     }
    //     if (isIn === false) {
    //       arr.push(array[i])
    //     }
    //     console.log(array)
    //   }
    //   return arr
    // }

    //return a cart array with cartQuantity on it
    this.props.cart.map(product => {
      product.cartQuantity = this.props.cart.filter(
        prod => prod.id === product.id
      ).length
      // product.createdAt = null
      // product.updatedAt = null
    })
    // let uniqueArray = unique(this.props.cart)
    console.log('UNIQUE ARRAY:', uniqueArray)
    console.log('Cart:', this.props.cart)
    return (
      <div>
        <h1>Products in Cart:</h1>
        {uniqueArray.map((product, index) => {
          return (
            <div key={index}>
              <h3>{product.name}</h3>
              <img src={product.imageUrl} />
              <h3>Quantity: {product.cartQuantity} </h3>
            </div>
          )
        })}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      return dispatch(getCart())
    },
    guestAdd: cart => {
      return dispatch(guestAdd(cart))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
