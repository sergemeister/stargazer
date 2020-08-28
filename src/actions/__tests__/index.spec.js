import * as actions from '../index'
import * as types from '../types'

describe('actions', () => {
  it('should create an action to get a repository', () => {
    const repositoryName = 'facebook/react'
    const expectedAction = {
      type: types.GET_REPOSITORY,
      payload: repositoryName
    }
    expect(actions.getRepository(repositoryName)).toEqual(expectedAction)
  })

  it('should create an action to add a repository', () => {
    const repository = {
      id: 10270250,
      full_name: "facebook/react",
      stargazers_count: 154386,
      subscribers_count: 6678,
      forks_count: 30270,
      clone_url: "https://github.com/facebook/react.git",
      languages_url: "https://api.github.com/repos/facebook/react/languages"
    }
    const expectedAction = {
      type: types.GET_REPOSITORY_SUCCESSFUL,
      payload: repository
    }
    expect(actions.getRepositorySuccessful(repository)).toEqual(expectedAction)
  })

  it('should create an action to add an error', () => {
    const errorMessage = "Repository not found"
    const expectedAction = {
      type: types.GET_REPOSITORY_FAILURE,
      payload: errorMessage
    }
    expect(actions.getRepositoryFailure(errorMessage)).toEqual(expectedAction)
  })

  it('should create an action to remove a repository', () => {
    const id = "123"
    const expectedAction = {
      type: types.REMOVE_REPOSITORY,
      payload: id
    }
    expect(actions.removeRepository(id)).toEqual(expectedAction)
  })

  it('should create an action to get repository languages', () => {
    const id = "123"
    const expectedAction = {
      type: types.GET_REPOSITORY_LANGUAGES,
      payload: id
    }
    expect(actions.getRepositoryLanguages(id)).toEqual(expectedAction)
  })

  it('should create an action to add repository languages', () => {
    const payload = {
      id: "10270250",
      languages: {
        JavaScript: "94.9%",
        HTML: "2.2%",
        CSS :"1.2%"
      }
    }
    const expectedAction = {
      type: types.GET_REPOSITORY_LANGUAGES_SUCCESSFUL,
      payload: payload
    }
    expect(actions.getRepositoryLanguagesSuccessful(payload)).toEqual(expectedAction)
  })
})
