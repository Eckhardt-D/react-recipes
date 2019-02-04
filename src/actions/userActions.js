import { GET_USER, SET_USER } from './types'
import { auth } from '../services/firebase'

export const getUser = () => dispatch => {
    return new Promise((resolve, reject) => {
        try {
            auth.onAuthStateChanged(user => {
                if(user) {
                    dispatch({
                        type: GET_USER,
                        payload: user
                    })
                    resolve()
                } else {
                    dispatch({
                        type: GET_USER,
                        payload: null
                    })
                    resolve()
                }
            })
        } catch(e) {
            reject(e)
        } 
    })
};

export const setUser = userData => dispatch => {
    dispatch({
      type: SET_USER,
      payload: userData
    })
};