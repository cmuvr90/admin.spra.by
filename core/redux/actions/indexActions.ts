export const SET_CONFIG = 'SET_CONFIG'

/**
 *
 * @param state
 */
export const setConfig = (state: boolean = true) => ({type: SET_CONFIG, payload: state})
