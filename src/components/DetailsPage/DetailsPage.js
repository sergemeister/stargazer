import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

const DetailsPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const repository  = useSelector(state => state.repositories.data[`${id}`])


  useEffect(() => {
    if (!repository) {
      history.push('/')
    }
  }, [repository])

  return(
    <div>Details page {id}</div>
  )
}

export default DetailsPage