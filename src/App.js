import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import NotFoundPage from './NotFoundPage'

import './App.css'

const emptyShelf = () => ({
  currentlyReading: [],
  wantToRead: [],
  read: [],
  none: []
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialized: false,
      booksIndex: {},
      shelfsIndex: {...emptyShelf()}
    }
  }

  storeBooks(books) {
    const booksIndex = {}
    const shelfsIndex = {...emptyShelf()}
    books.forEach((book) => {
      booksIndex[book.id] = book
      shelfsIndex[book.shelf].push(book)
    })
    this.setState({booksIndex, shelfsIndex, initialized: true})
  }

  changeBookShelf(book, newShelf, oldShelf) {
    console.log('change book shelf...');
    const booksIndex = {
      ...this.state.booksIndex,
      [book.id]: book
    }
    const shelfsIndex = {
      ...this.state.shelfsIndex,
      [newShelf]: this.state.shelfsIndex[newShelf].filter((otherBook) => otherBook.id !== book.id).concat([book]),
      [oldShelf]: this.state.shelfsIndex[oldShelf].filter((otherBook) => otherBook.id !== book.id)
    }
    if (newShelf === "none") {
      delete booksIndex[book.id]
      shelfsIndex["none"] = []
    }
    this.setState({booksIndex, shelfsIndex})
  }

  getShelf(shelfName) {
    return this.state.shelfsIndex[shelfName].slice()
  }
  getCurrentlyReading() {
    return this.getShelf("currentlyReading")
  }
  getWantToRead() {
    return this.getShelf("wantToRead")
  }
  getRead() {
    return this.getShelf("read")
  }
  findBookShelf(book) {
    const shelfBook = this.state.booksIndex[book.id]
    if (shelfBook) {
      return shelfBook.shelf
    }
    return null
  }

  getDb() {
    const {storeBooks,
           changeBookShelf,
           getCurrentlyReading,
           getWantToRead,
           getRead,
           findBookShelf} = this
    return {
      storeBooks: storeBooks.bind(this),
      changeBookShelf: changeBookShelf.bind(this),
      getCurrentlyReading: getCurrentlyReading.bind(this),
      getWantToRead: getWantToRead.bind(this),
      getRead: getRead.bind(this),
      findBookShelf: findBookShelf.bind(this),
      initialized: this.state.initialized
    }
  }

  render() {
    const db = this.getDb()
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" render={(props) => <HomePage db={db} {...props}/>}/>
            <Route exact path="/search" render={(props) => <SearchPage db={db} {...props}/>}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
