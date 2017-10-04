import React from 'react'
import BooksGrid from './BooksGrid'

const BookShelf = ({shelfTitle, emptyMessage, books, onChange}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      <BooksGrid emptyMessage={emptyMessage}
                 onChange={onChange}
                 books={books}/>
    </div>
  </div>
)

export default BookShelf
