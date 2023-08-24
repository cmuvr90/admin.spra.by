export const SET_USER = 'SET_USER'
export const SET_LOADING = 'SET_LOADING'
export const REGISTER = 'REGISTER'

export const setUser = (payload = {}) => ({ type: SET_USER, payload })
export const setLoading = (payload = true) => ({ type: SET_LOADING, payload })
export const register = (payload = {}) => ({ type: REGISTER, payload })
