import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import RepoItem from '../RepoItem/'
import { orderBy } from 'lodash'

const ReposList = () => {
  const repositories  = useSelector(state => state.repositories.data)
  
  return(
    <Table>
      <thead>
        <tr>
          <th>Repository name</th>
          <th>Stars</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orderBy(Object.values(repositories), ['stargazers_count'], ['desc']).map(repo =>
          <RepoItem
            key={repo.id}
            id={repo.id}
            name={repo.full_name}
            starsCount={repo.stargazers_count}
          />
        )}
      </tbody>
    </Table>
  )
}

export default ReposList;