import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import RepoItem from '../RepoItem'
import { repositoriesData } from '../../redux/selectors'

const ReposList = () => {
  const repositories  = useSelector(repositoriesData)
  
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
        {repositories.map(repo =>
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

export default ReposList
