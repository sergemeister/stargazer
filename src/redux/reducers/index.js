import { combineReducers } from 'redux' 
import reposDataHandling from './reposDataHandling'

export default combineReducers({
  repositories: reposDataHandling
})
