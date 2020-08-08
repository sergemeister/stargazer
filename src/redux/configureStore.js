import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import Reducer from '../reducers/index'

const initialState = {}

export default function configureStore() {
  return createStore(
    Reducer,
    initialState,
    composeWithDevTools(
      // applyMiddleware(thunk),
    )
  )
}

