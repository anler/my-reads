import React from 'react'
import {Link} from 'react-router-dom'
import {Debounce} from 'react-throttle'
import BooksGrid from './BooksGrid'
import Loading from './Loading'
import Error from './Error'

import * as BooksApi from './BooksApi'
import {getQueryParam, updateQueryParam} from './util'

class SearchPage extends React.Component {

  queryParam = "q"
  maxResults = 50

  constructor(props) {
    super(props)
    this.db = props.db
    this.state = {
      results: [],
      loading: false,
      query: "",
      error: null
    }
  }

  componentWillMount() {
    const query = getQueryParam(this.props.location.search, this.queryParam)
    this.setState({query})
  }

  componentDidMount() {
    this.searchBooks(this.state.query)
  }

  searchBooks(query) {
    const performQuery = () => {
      this.props.history.replace({search: updateQueryParam(this.props.history.location.search, this.queryParam, query)})
      this.setState({query, loading: query.length > 0})
      if (query) {
        BooksApi.search(query, this.maxResults)
          .then((resp) => {
            if (Array.isArray(resp) && this.state.query === query) {
              let books = resp
              books.forEach((book) => book.shelf = this.db.findBookShelf(book))
              this.loadedBooks(books)
            } else {
              this.handleError(resp.error)
            }
          })
      } else {
        this.loadedBooks([])
      }
    }

    if (this.db.initialized) {
      performQuery()
    } else {
      BooksApi
        .getAll()
        .then(this.db.storeBooks.bind(this.db))
        .then(performQuery)
    }
  }

  handleError(error) {
    this.setState({loading: false, error})
  }

  loadedBooks(books) {
    this.setState({results: books || [], loading: false})
  }

  render() {
    const {query, results, loading, error} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input type="text"
                     // value={query}
                     // ^^^^^^^^^^^^^
                     // commented due to issue with react-throttle:
                     // https://github.com/gmcquistin/react-throttle/issues/7#issuecomment-334921686
                     placeholder="Search by title or author"
                     onChange={(e) => this.searchBooks(e.currentTarget.value)}
                />
            </Debounce>
          </div>
        </div>

        <div className="search-books-results">
          <Loading cond={loading}/>
          <Error error={error}/>
          <BooksGrid books={results} emptyMessage="No books listed"/>
        </div>
      </div>
    )
  }
}

export default SearchPage
