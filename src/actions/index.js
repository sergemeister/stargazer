import * as types from './types';

export const getRepository = (fullName) => ({
  type: types.GET_REPOSITORY,
  payload: fullName 
})
