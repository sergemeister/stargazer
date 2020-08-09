import * as types from '../../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_REPOSITORY_SUCCESSFUL:
      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case types.GET_REPOSITORY_FAILURE:
      return {
        ...state
      }

    default:
      return state
  }
}