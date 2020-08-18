import * as types from '../../actions/types'
import { omit } from 'lodash'

const initialState = {
  data: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPOSITORY_SUCCESSFUL:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: action.payload,
        },
        error: null
      }

    case types.GET_REPOSITORY_FAILURE:
      return {
        ...state,
        error: action.payload 
      }

    case types.REMOVE_REPOSITORY:
      return {
        ...state,
        data: omit(state.data, action.payload)
      }

    case types.GET_REPOSITORY_LANGUAGES_SUCCESSFUL:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            languages: action.payload.languages
          }
        }
      }

    default:
      return state
  }
}