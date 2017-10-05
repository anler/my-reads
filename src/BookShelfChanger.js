import React from 'react'

import * as BooksApi from './BooksApi'


const BookShelfChanger = ({book, onChangeBookShelf}) => {
  const onChange = (e) => {
    const newShelf = e.target.value
    const oldShelf = shelf(book)
    BooksApi.update(book, newShelf)
    if (onChangeBookShelf) {
      onChangeBookShelf({...book, shelf: newShelf}, newShelf, oldShelf)
    }
  }

  return (
    <select value={shelf(book) || "none"} onChange={onChange}>
      <option disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  )
}

function shelf({shelf}) {
  return shelf
}

export default BookShelfChanger
