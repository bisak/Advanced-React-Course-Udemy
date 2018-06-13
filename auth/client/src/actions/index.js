import { AUTH_USER, AUTH_ERROR } from './types'
import axios from 'axios'

export const signup = (formProps, cb) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps)
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    })
    localStorage.setItem('token', response.data.token)
    cb()
  } catch (error) {
    console.log({ ...error })
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.error
    })
  }
}

export const signout = () => {
  localStorage.removeItem('token')

  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const signin = (formProps, cb) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3090/signin', formProps)
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    })
    localStorage.setItem('token', response.data.token)
    cb()
  } catch (error) {
    console.log({ ...error })
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.error
    })
  }
}