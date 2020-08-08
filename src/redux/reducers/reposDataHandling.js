import * as types from '../../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_REPOSITORY_SUCCESSFUL:
      console.log('success')
      return {
        ...state
      }

    case types.GET_REPOSITORY_FAILURE:
      console.log('fail')
      return {
        ...state
      }

    default:
      return state
  }
}