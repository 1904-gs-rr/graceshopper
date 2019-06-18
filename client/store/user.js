import axios from 'axios'
import history from '../history'
import {getCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const editUser = updatedUser => ({type: EDIT_USER, updatedUser})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, cart) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    await axios.put('/api/cart/transferGuestCart', cart)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const editUserThunk = (
  id,
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  try {
    const {data} = await axios.put('/edituser', {
      id,
      firstName,
      lastName,
      email,
      password
    })
    console.log('DATAATATAT', data)
    dispatch(editUser(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case EDIT_USER:
      return action.updatedUser
    default:
      return state
  }
}
