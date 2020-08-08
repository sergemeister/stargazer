import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import HomePage from './components/HomePage'
import './App.css'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
