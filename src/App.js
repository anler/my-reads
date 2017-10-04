import React from 'react'
// import * as BooksAPI from './BooksAPI'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import NotFoundPage from './NotFoundPage'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import {do_, getQueryParam, updateQueryParam} from './util'

const homePage = (books, onChange) => () =>
      <HomePage books={books} onChange={onChange}/>

const searchPage = (books, onChange, onSearch) => ({location: {search}, history}) => (
  <SearchPage books={books}
              onChange={onChange}
              searchTerm={getQueryParam(search, "q")}
              onSearch={do_((term) => history.replace({search: updateQueryParam(search, "q", term)}), onSearch)}
    />
)

class App extends React.Component {
  state = {
    shelfs: {
      currentlyReading: [{
        cover: {
          width: "128",
          height: "193",
          url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        },
        title: "To Kill a Mockingbird",
        authors: ["Harper Lee"],
        shelf: "wantToRead"
      }],
      wantToRead: [],
      read: []
    }
  }

  onChangeShelf(book, newShelf) {
    console.log(`Moving book ${book.title} to shelf ${newShelf}`);
  }

  onSearchBook(term) {
    console.log(`Searching for ${term}`);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" render={homePage(this.state, this.onChangeShelf)}
                   />
            <Route exact path="/search" render={searchPage([], this.onChangeShelf, this.onSearchBook)}
                   />
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
