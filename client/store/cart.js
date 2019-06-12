import axios from 'axios'
import history from '../history'

const GOT_CART = 'GOT_CART'
const ADD_ITEM = 'ADD_ITEM'
const GUEST_ADD = 'GUEST_ADD'

const defaultCart = []

const gotCart = cart => ({type: GOT_CART, cart})
const addItem = item => ({type: ADD_ITEM, item})
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

export const addingItem = item => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/`, item)
      dispatch(addItem(item))
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
      return [...state, action.item]
    case GUEST_ADD:
      return action.cart
    default:
      return state
  }
}
