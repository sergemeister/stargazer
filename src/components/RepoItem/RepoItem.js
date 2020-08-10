import React from 'react'
import { useDispatch } from 'react-redux'
import { removeRepository } from '../../actions'

const RepoItem = ({id, name, starsCount}) => {
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeRepository(id))
  }
 
  return(
    <tr>
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

export default RepoItem;