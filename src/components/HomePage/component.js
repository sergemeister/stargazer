import React from 'react'
import AddRepoForm from '../AddRepoForm'
import ReposList from '../ReposList'
import './component.scss'

const HomePage = () => {
  return(
    <div className="homepage">
      <AddRepoForm />
      <ReposList />
    </div>
  )
}

export default HomePage
