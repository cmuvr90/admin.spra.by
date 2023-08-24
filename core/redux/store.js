import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import think from 'redux-thunk'
import { indexReducer } from './reducers/indexReducer'
import { layoutReducer } from './reducers/layoutReducer'
import { usersReducer } from './reducers/usersReducer'

const rootReducer = combineReducers({
    index: indexReducer,
    layout: layoutReducer,
    users: usersReducer,
})

export const store = createStore(rootReducer, applyMiddleware(think))
