import { SET_USER, GET_USER } from '../actions/types';

const initialState = {
  user: [],
  userId: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        userId: action.payload && action.payload.uid ? action.payload.uid : null
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userId: action.payload.uid
      };
    default:
      return state;
  }
}