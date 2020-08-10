import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage'
import DetailsPage from './components/DetailsPage/'
import './App.css'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/repositories/:id' component={DetailsPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
