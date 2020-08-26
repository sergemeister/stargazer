import { createSelector } from 'reselect'
import { orderBy } from 'lodash'

const repositories = state => state.repositories

export const repositoryError = createSelector(
  repositories,
  repositories => repositories.error
)

export const repositoriesData = createSelector(
  repositories,
  repositories => orderBy(Object.values(repositories.data), ['stargazers_count'], ['desc'])
)


export const repositoryData = (id) => createSelector(
  repositories,
  repositories => repositories.data[id]
)
