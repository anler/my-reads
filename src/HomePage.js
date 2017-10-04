import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

const currentlyReading = ({currentlyReading}) => currentlyReading
const wantToRead = ({wantToRead}) => wantToRead
const read = ({read}) => read

const HomePage = ({books, onChange}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <BookShelf shelfTitle="Currently Reading"
                 onChange={onChange}
                 books={currentlyReading(books)}/>
      <BookShelf shelfTitle="Want to Read"
                 onChange={onChange}
                 books={wantToRead(books)}/>
      <BookShelf shelfTitle="Read"
                 onChange={onChange}
                 books={read(books)}/>
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
)

export default HomePage
