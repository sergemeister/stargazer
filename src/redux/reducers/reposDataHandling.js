import * as types from '../../actions/types'

export default (state = {}, action) => {
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

    default:
      return state
  }
}