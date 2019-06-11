import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({type: GOT_PRODUCTS, products})

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
