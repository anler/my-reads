import React from 'react'

const BookShelfChanger = ({book, onChange}) => (
  <select value={shelf(book)} onChange={(e) => onChange(book, e.target.value)}>
    <option value="none" disabled>Move to...</option>
    <option value="currentlyReading">Currently Reading</option>
    <option value="wantToRead">Want to Read</option>
    <option value="read">Read</option>
    <option value="none">None</option>
  </select>
)

function shelf({shelf}) {
  return shelf
}

export default BookShelfChanger
