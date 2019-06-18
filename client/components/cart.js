import React from 'react'
import {connect} from 'react-redux'

import {getCart, guestAdd, addingItem, editingItem} from '../store/cart'
import {NavLink, Redirect} from 'react-router-dom'
import {Button, Form} from 'semantic-ui-react'

class Cart extends React.Component {
  constructor() {
    super()
  }
  changeQuantity(prod, ref) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(el => {
      if (el.id === prod.id) {
        el.cartQuantity = ref
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    this.props.guestAdd(cart)
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

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.props.getCart()
    }
  }
  render() {
    return (
      <div className="ui center aligned one column grid">
        <div
          className="ui center aligned one column grid"
          style={{'padding-top': '25%'}}
        >
          <h1>Products in Cart:</h1>
          <div className="ui center aligned one row grid">
            {this.props.cart
              .filter(item => {
                return item.cartQuantity !== 0
              })
              .map(product => {
                let ref = `productQuantity${product.id}`
                let options = []
                let selectQuantity =
                  product.quantity > 10 ? 10 : product.quantity
                for (let i = 0; i <= selectQuantity; i++) {
                  options.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  )
                }
                return (
                  <div key={product.id}>
                    <h3>{product.name}</h3>
                    <img src={product.imageUrl} />
                    <h3>Quantity: {product.cartQuantity} </h3>
                    <select ref={ref}>{options}</select>
                    <Button
                      size=" small"
                      type="button"
                      onClick={
                        this.props.user.id
                          ? () =>
                              this.props.userEdit(
                                product,
                                +this.refs[ref].value
                              )
                          : () =>
                              this.changeQuantity(
                                product,
                                +this.refs[ref].value
                              )
                      }
                    >
                      Change Quantity
                    </Button>
                  </div>
                )
              })}
          </div>
          <NavLink to="/checkout">To Checkout</NavLink>
        </div>
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
    },
    userAdd: (item, quantity) => {
      return dispatch(addingItem(item, quantity))
    },
    userEdit: (item, quantity) => {
      return dispatch(editingItem(item, quantity))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
