import * as types from './types';

export const getRepository = (fullName) => ({
  type: types.GET_REPOSITORY,
  payload: fullName 
})

export const removeRepository = (id) => ({
  type: types.REMOVE_REPOSITORY,
  payload: id
})

