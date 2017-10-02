import React from 'react'
// import * as BooksAPI from './BooksAPI'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import NotFoundPage from './NotFoundPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

class App extends React.Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/search" exact component={SearchPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
