import {legacy_createStore as createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import think from 'redux-thunk'
import {indexReducer} from './reducers/indexReducer'
import {layoutReducer, LayoutState} from './reducers/layoutReducer'
import {usersReducer} from './reducers/usersReducer'

const rootReducer = combineReducers({
  index: indexReducer, layout: layoutReducer, users: usersReducer,
})

export const store = createStore(rootReducer, applyMiddleware(think))

export type Storage = {
  layout: LayoutState
}
