import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createLogicMiddleware } from 'redux-logic'
import Reducer from './reducers'
import rootLogic from './logic/'
import axios from 'axios'

const initialState = {
  repositories: {
    data: {},
    error: null
  }
}

const logicDeps = {
    httpClient: axios
}

const logicMiddleware = createLogicMiddleware(rootLogic, logicDeps);


export default function configureStore() {
  return createStore(
    Reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(logicMiddleware),
    )
  )
}

