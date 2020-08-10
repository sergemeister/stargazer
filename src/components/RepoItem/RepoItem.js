import React from 'react'

const RepoItem = ({name, starsCount}) => {
  console.log('???')
  return(
    <tr>
      <td>{name}</td>
      <td>{starsCount}</td>
      <td>
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </td>
    </tr>
  )
}

export default RepoItem;