import axios from 'axios'
import history from '../history'

const GOT_CART = 'GOT_CART'
const ADD_ITEM = 'ADD_ITEM'
const GUEST_ADD = 'GUEST_ADD'

const defaultCart = []

const gotCart = cart => ({type: GOT_CART, cart})
const addItem = (item, quantity) => ({type: ADD_ITEM, item, quantity})
export const guestAdd = cart => ({type: GUEST_ADD, cart})

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

export const addingItem = (item, quantity) => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/`, {item, quantity})
      dispatch(addItem(item, quantity))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADD_ITEM:
      const newState = state.map(prod => {
        if (prod.id === action.item.id) {
          prod.cartQuantity = parseInt(action.quantity)
        }
        return prod
      })
      return newState
    case GUEST_ADD:
      return action.cart
    default:
      return state
  }
}
