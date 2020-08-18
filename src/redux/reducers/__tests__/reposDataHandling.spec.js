// import reducer from '../reposDataHandling'
import * as types from '../../actions/types'

describe('reposDataHandling reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        data: {},
        error: null
      }
    ])
  })
})
