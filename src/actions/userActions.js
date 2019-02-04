import { GET_USER, SET_USER } from './types'
import { auth } from '../services/firebase'

export const getUser = () => dispatch => {
    if(auth().currentUser) {
        dispatch({
            type: GET_USER,
            payload: auth().currentUser.uid
        })
    } else {
        dispatch({
            type: GET_USER,
            payload: null
        })
    }
};

export const setUser = userData => dispatch => {
    dispatch({
      type: SET_USER,
      payload: userData
    })
};