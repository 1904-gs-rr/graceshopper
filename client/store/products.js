import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GET_PRODUCTS'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({type: GOT_PRODUCTS, products})

export const editProduct = (product, quantity) => {
  return {
    type: EDIT_PRODUCT,
    product,
    quantity
  }
}

/**
 * THUNK CREATORS
 */
export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/')
      dispatch(gotProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addingGuestDB = (prod, value) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart/addGuest', {prod, value})
    } catch (err) {
      console.log(err)
    }
  }
}

export const guestEdit = (prod, value) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart/guestEdit', {prod, value})
      dispatch(getProducts())
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    default:
      return state
  }
}
