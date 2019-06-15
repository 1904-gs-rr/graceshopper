import axios from 'axios'
import history from '../history'

const GOT_CART = 'GOT_CART'
const ADD_ITEM = 'ADD_ITEM'
const GUEST_ADD = 'GUEST_ADD'
const EDIT_ITEM = 'EDIT_ITEM'

const defaultCart = []

const gotCart = cart => ({type: GOT_CART, cart})
const addItem = item => ({type: ADD_ITEM, item})
const editItem = (item, quantity) => ({type: EDIT_ITEM, item, quantity})
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
      await axios.put(`/api/cart/add`, {item, quantity})
      if (item.cartQuantity) {
        item.cartQuantity = item.cartQuantity + quantity
      } else {
        item.cartQuantity = quantity
      }
      dispatch(addItem(item))
    } catch (err) {
      console.error(err)
    }
  }
}

export const editingItem = (item, quantity) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart/edit', {item, quantity})
      dispatch(editItem(item, quantity))
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
      state.forEach((item, idx) => {
        if (item.id === action.item.id) {
          state[idx] = action.item
        }
      })
      return [...state]
    case GUEST_ADD:
      return action.cart
    case EDIT_ITEM:
      state.forEach((item, idx) => {
        if (item.id === action.item.id) {
          state[idx] = action.item
          state[idx].cartQuantity = action.quantity
        }
      })
      return [...state]
    default:
      return state
  }
}
