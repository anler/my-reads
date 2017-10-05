import React from 'react'
import BookShelfChanger from './BookShelfChanger'


const BooksGrid = ({books, emptyMessage, onChangeBookShelf}) =>
      books.length > 0 ? (
        <ol className="books-grid">
          {books.map((book, i) => (
            <li key={i}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover"
                       style={cover(book)}></div>
                  <div className="book-shelf-changer">
                    <BookShelfChanger book={book}
                                      onChangeBookShelf={onChangeBookShelf}
                                      />
                  </div>
                </div>
                <div className="book-title">{title(book)}</div>
                <div className="book-authors">{authors(book)}</div>
              </div>
            </li>
          ))}
        </ol>
      ) : (<p>{emptyMessage || "Empty"}</p>)


function cover({imageLinks: {thumbnail}}) {
  return {width: 128,
          height: 193,
          backgroundImage: `url(${thumbnail})`
         }
}

function title({title}) {
  return title
}

function authors({authors}) {
  return authors ? authors.join(", ") : ""
}

export default BooksGrid
