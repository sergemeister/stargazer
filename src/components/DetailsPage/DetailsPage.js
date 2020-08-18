import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getRepositoryLanguages } from '../../actions/'
import { Button } from 'react-bootstrap'
import './DetailsPage.scss'

const DetailsPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const repository  = useSelector(state => state.repositories.data[id])

  useEffect(() => {
    dispatch(getRepositoryLanguages(id))
  }, [id, dispatch])

  return(
    <div className="details-page">
      {repository      
        ? <>
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
                {repository.languages &&
                  <Fragment>
                    <div className="stats-head">Languages:</div>
                    {Object.keys(repository.languages).map(language =>
                      <div key={language}>
                        {language}: {repository.languages[language]}
                      </div>
                    )}
                  </Fragment>
                }
              </div>
            </div>
          </>
        : <div className='no-repo'>There is no such repository, man</div>
      }
      <Button variant="primary" size="sm" onClick={() => history.push('/')}>
        Go back
      </Button>
    </div>
  )
}

export default DetailsPage
