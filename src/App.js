import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import NotFoundPage from './NotFoundPage'
import Loading from './Loading'

import * as BooksApi from './BooksApi'
import {getQueryParam, updateQueryParam} from './util'

import './App.css'

const emptyShelfs = () => ({
  currentlyReading: [],
  wantToRead: [],
  read: []
})


class App extends React.Component {
  state = {
    shelfs: emptyShelfs(),
    shelfsLoaded: false,
    lastQuery: "",
    searchResults: []
  }

  queryParam = "q"
  maxResults = 50

  componentDidMount() {
    // BooksApi.getAll().then((books) => {
    //   const shelfs = books.reduce((acc, book) => {
    //     acc[book.shelf].push(book)
    //     return acc
    //   }, emptyShelfs())

    //   this.setState({shelfs, fetching: false})
    // })
  }

  changeShelf(book, newShelf) {
    console.log(`Moving book ${book.title} to shelf ${newShelf}`);
  }

  searchBooks(query, history) {
    if (query !== this.state.lastQuery) {
      BooksApi.search(query, this.maxResults).then((books) => {
        const currentQuery = getQueryParam(history.location.search, this.queryParam)
        if (currentQuery === query) {
          console.log("this set state");
          this.setState({searchResults: books || [], lastQuery: currentQuery})
        }
      })
    }
  }

  updateSearch(query, history) {
    history.replace({search: updateQueryParam(history.location.search, this.queryParam, query)})
  }

  loading(condition, message, render) {
    return condition ? () => <Loading message={message}/> : render.bind(this)
  }

  renderHomePage() {
    // BooksApi.getAll().then((books) => {
    //   const shelfs = books.reduce((acc, book) => {
    //     acc[book.shelf].push(book)
    //     return acc
    //   }, emptyShelfs())

    //   this.setState({shelfs, fetching: false})
    // })
    console.log(this.state.shelfsLoaded);
    if (!this.state.shelfsLoaded) {
      this.setState({shelfsLoaded: true})
    }
    return (
      <HomePage currentlyReading={this.state.shelfs.currentlyReading}
                read={this.state.shelfs.read}
                wantToRead={this.state.shelfs.wantToRead}
                onChange={this.changeShelf}/>
    )
  }

  renderSearchPage({location, history}) {
    const query = getQueryParam(location.search, this.queryParam)
    this.searchBooks(query, history)

    return (
      <SearchPage books={this.state.searchResults}
                  onChange={this.changeShelf}
                  query={query}
                  onSearch={(query) => this.updateSearch(query, history)}
                  />
    )
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/"
                   render={this.renderHomePage.bind(this)}
                   />
            <Route exact path="/search"
                   render={this.renderSearchPage.bind(this)}
                   />
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
