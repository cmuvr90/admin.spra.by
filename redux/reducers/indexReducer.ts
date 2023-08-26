import {SET_CONFIG} from '../actions/indexActions'

const initialState = {
  config: null,
}

export const indexReducer = (state = initialState, action: {type: string; payload: {[key: string | number]: any}}) => {
  switch (action.type) {
    case SET_CONFIG:
      return {...state, config: action.payload}
    default:
      return state
  }
}
