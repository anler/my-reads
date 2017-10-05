import React from 'react'
import BooksGrid from './BooksGrid'

const BookShelf = ({title, emptyMessage, books, onChangeBookShelf}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BooksGrid emptyMessage={emptyMessage}
                 onChangeBookShelf={onChangeBookShelf}
                 books={books}/>
    </div>
  </div>
)

export default BookShelf
