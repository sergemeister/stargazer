import React from 'react'
import AddRepoForm from '../AddRepoForm'
import ReposList from '../ReposList'
import './HomePage.scss'

const HomePage = () => {
  return(
    <div className="homepage">
      <AddRepoForm />
      <ReposList />
    </div>
  )
}

export default HomePage