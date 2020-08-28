import * as types from './types';

export const getRepository = (fullName) => ({
  type: types.GET_REPOSITORY,
  payload: fullName 
})

export const getRepositorySuccessful = (repository) => ({
  type: types.GET_REPOSITORY_SUCCESSFUL,
  payload: repository
})

export const getRepositoryFailure = (error) => ({
  type: types.GET_REPOSITORY_FAILURE,
  payload: error
})

export const removeRepository = (id) => ({
  type: types.REMOVE_REPOSITORY,
  payload: id
})

export const getRepositoryLanguages = (id) => ({
  type: types.GET_REPOSITORY_LANGUAGES,
  payload: id
})

export const getRepositoryLanguagesSuccessful = ({id, languages}) => ({
  type: types.GET_REPOSITORY_LANGUAGES_SUCCESSFUL,
  payload: {
    id: id,
    languages: languages
  }
})
