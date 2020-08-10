import React from 'react'
import { useDispatch } from 'react-redux'
import { removeRepository } from '../../actions'
import { useHistory } from 'react-router-dom'
import './RepoItem.css'

const RepoItem = ({id, name, starsCount}) => {
  let history = useHistory()
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeRepository(id))
  }
 
  return(
    <tr
      className='repo-item'
      onClick={() => history.push(`/repositories/${id}`)}>
      <td>{name}</td>
      <td>{starsCount}</td>
      <td>
        <button
          type="button"
          className="close"
          onClick={handleRemove}>
          <span aria-hidden="true">&times;</span>
        </button>
      </td>
    </tr>
  )
}

export default RepoItem