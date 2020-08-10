
import * as types from '../../actions/types';
import { createLogic } from 'redux-logic';
import { pick } from 'lodash'

const reposDataHandlingLogic = createLogic({
  type: types.GET_REPOSITORY,
  latest: true,

  processOptions: {
    dispatchReturn: true,

    successType: types.GET_REPOSITORY_SUCCESSFUL,
    failType: types.GET_REPOSITORY_FAILURE 
  },

  transform({ getState, action }, next, reject) {
    const splittedFullName = action.payload.split('/')
    if (splittedFullName.length === 2) {
      next({
        ...action,
        payload: {
          owner: splittedFullName[0],
          repo: splittedFullName[1]
        }
      });
    } else {
      reject({
        type: types.GET_REPOSITORY_FAILURE,
        payload: 'Invalid format'
      })
    }
  },

  process({ httpClient, action }, dispatch, done) {
    return httpClient.get(`https://api.github.com/repos/${action.payload.owner}/${action.payload.repo}`)
      .then(resp => resp.data)
      .then(data => {
        done()
        return pick(data, ['id', 'full_name', 'stargazers_count', 'subscribers_count', 'forks_count', 'clone_url', 'languages_url'])
      })
      .catch(e => Promise.reject('Repository not found'))
  }
})

export default [
  reposDataHandlingLogic
]