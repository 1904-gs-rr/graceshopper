import axios from 'axios'
import history from '../history'

const GOT_CART = 'GOT_CART'

const defaultCart = []

const gotCart = cart => ({type: GOT_CART, cart})

export const getCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(gotCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return state
  }
}
