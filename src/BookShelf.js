import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const BookShelf = ({shelfTitle, emptyShelfMessage, books}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      {books.length > 0 ? (
        <ol className="books-grid">
          {books.map((book, i) => (
            <li key={i}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover"
                       style={cover(book)}></div>
                  <div className="book-shelf-changer">
                    <BookShelfChanger book={book}/>
                  </div>
                </div>
                <div className="book-title">{title(book)}</div>
                <div className="book-authors">{authors(book)}</div>
              </div>
            </li>
          ))}
        </ol>
        ) : (
          <p>{emptyShelfMessage || "Empty"}</p>
      )}
    </div>
  </div>
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

export default BookShelf
