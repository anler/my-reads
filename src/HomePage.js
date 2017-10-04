import React from 'react'
import BookShelf from './BookShelf'

const books = [
  {
    cover: {
      width: "128",
      height: "193",
      url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
    },
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    shelf: "wantToRead"
  }
]

class HomePage extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf shelfTitle="Currently Reading"
                     emptyShelfMessage="You are not reading anything yet, pick a book to read!"
                     books={books}/>
          <BookShelf shelfTitle="Want to Read"
                     emptyShelfMessage=""
                     books={books}/>
          <BookShelf shelfTitle="Read"
                     emptyShelfMessage=""
                     books={books}/>
        </div>
      </div>
    )
  }
}

export default HomePage
