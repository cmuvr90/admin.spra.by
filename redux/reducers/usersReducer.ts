import {SET_USER} from '../actions/usersActions'

/**
 *
 */
const initialState = {
  user: null,
}

/**
 *
 * @param state
 * @param action
 */
export const usersReducer = (state = initialState, action: {type: string; payload: any}) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload}
    default:
      return state
  }
}
