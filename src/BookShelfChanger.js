import React from 'react'

const BookShelfChanger = ({book}) => (
  <select value={shelf(book)} onChange={onChangeShelf}>
    <option value="none" disabled>Move to...</option>
    <option value="currentlyReading">Currently Reading</option>
    <option value="wantToRead">Want to Read</option>
    <option value="read">Read</option>
    <option value="none">None</option>
  </select>
)

function onChangeShelf() {}

function shelf({shelf}) {
  return shelf
}

export default BookShelfChanger
