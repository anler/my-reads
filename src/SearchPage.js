import React from 'react'
import {Link} from 'react-router-dom'
import BooksGrid from './BooksGrid'
import {ignore} from './util'

const SearchPage = ({books, searchTerm, onChange, onSearch}) => {
  const onSearch_ = onSearch || ignore("onSearch handler not passed to SearchPage component")
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text"
                 value={searchTerm}
                 placeholder="Search by title or author"
                 onChange={(e) => onSearch_(e.target.value)}
            />
        </div>
      </div>

      <div className="search-books-results">
        <BooksGrid books={books}
                   emptyMessage="No books listed"
                   onChange={onChange}/>
      </div>
    </div>
  )
}

export default SearchPage
