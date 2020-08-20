
import * as types from '../../actions/types';
import { createLogic } from 'redux-logic';
import { pick } from 'lodash'
import {
  getRepositorySuccessful, getRepositoryFailure, getRepositoryLanguagesSuccessful
} from '../../actions'


export const fetchRepositoryLogic = createLogic({
  type: types.GET_REPOSITORY,
  latest: true,

  transform({ action }, next, reject) {
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
      reject(getRepositoryFailure('Invalid format'))
    }
  },

  process({ httpClient, action }, dispatch, done) {
    httpClient.get(`https://api.github.com/repos/${action.payload.owner}/${action.payload.repo}`)
      .then(resp => resp.data)
      .then(data => {
        const repository = pick(
          data,
          ['id', 'full_name', 'stargazers_count', 'subscribers_count', 'forks_count', 'clone_url', 'languages_url']
        )
        dispatch(getRepositorySuccessful(repository))
      })
      .catch(e => {
        dispatch(getRepositoryFailure('Repository not found'))
      })
      .then(() => done())
  }
})

export const fetchLanguagesLogic = createLogic({
  type: types.GET_REPOSITORY_LANGUAGES,
  latest: true,


  transform({ getState, action }, next, reject) {
    const id = action.payload
    const { repositories: { data } } = getState()

    if (data[id]) {
      next({
        ...action,
        payload: {
          id: id,
          languages_url: data[id].languages_url
        }
      });
    } else {
      reject()
    }
  },

  process({ httpClient, action }, dispatch, done) {
    return httpClient.get(action.payload.languages_url)
      .then(resp => resp.data)
      .then(data => calculateLanguagesPercents(data))
      .then(data => {
        const payload = {
          id: action.payload.id,
          languages: data
        }

        dispatch(getRepositoryLanguagesSuccessful(payload))
      })
      .catch(e => console.error(e))
      .then(() => done())
  }
})

const calculateLanguagesPercents = (languages) => {
  const calculatedData = {}
  const totalBytesOfCode = Object.values(languages).reduce((a, b) => a + b, 0)

  Object.keys(languages).forEach(language => {
    const calculatedPercents = (languages[language] / totalBytesOfCode * 100).toFixed(1)

    if (calculatedPercents > 0) calculatedData[language] = calculatedPercents + '%'
  })

  return calculatedData
}

export default [
  fetchRepositoryLogic,
  fetchLanguagesLogic
]
