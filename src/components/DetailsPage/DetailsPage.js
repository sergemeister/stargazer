import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './DetailsPage.scss'

const DetailsPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const repository  = useSelector(state => state.repositories.data[`${id}`])

  useEffect(() => {
    if (!repository) {
      history.push('/')
    }
  })

  return(
    <>
      {repository &&
        <div className="details-page">
          <div className="details-head">
            <div className="stats-col">
              {repository.full_name}
            </div>
            <div className="stats-col">
              <a href={repository.clone_url}>Clone</a>
            </div>
          </div>
          <div>            
            <div className="stats-col">
              <div className="stats-head">Stats:</div>
              <div>Watchers: {repository.subscribers_count}</div>
              <div>Stars: {repository.stargazers_count}</div>
              <div>Forks: {repository.forks_count}</div>
            </div>
            <div className="stats-col">
              <div className="stats-head">Languages:</div>
              {repository.languages
              ? "To be"
              : "Loading..."}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default DetailsPage