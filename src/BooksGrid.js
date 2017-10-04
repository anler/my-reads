import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const BooksGrid = ({books, emptyMessage, onChange}) =>
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
                                      onChange={onChange}
                                      />
                  </div>
                </div>
                <div className="book-title">{title(book)}</div>
                <div className="book-authors">{authors(book)}</div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p>{emptyMessage || "Empty"}</p>
      )

function cover({cover: {width, height, url}}) {
  return {width: parseInt(width, 10),
          height: parseInt(height, 10),
          backgroundImage: `url(${url})`
         }
}

function title({title}) {
  return title
}

function authors({authors}) {
  return authors.join(", ")
}

export default BooksGrid
