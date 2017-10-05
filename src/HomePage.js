import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import Loading from './Loading'

import * as BooksApi from './BooksApi'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.db = props.db
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    this.setState({loading: true})
  }

  componentDidMount() {
    BooksApi.getAll().then((books) => {
      this.db.storeBooks(books)
      this.setState({loading: false})
    })
  }

  changeBookShelf(book, newShelf, oldShelf) {
    this.db.changeBookShelf(book, newShelf, oldShelf)
  }

  render() {
    const {loading} = this.state
    const changeBookShelf = this.db.changeBookShelf.bind(this.db)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Loading cond={loading}>
          <div>
            <div className="list-books-content">
              <BookShelf title="Currently Reading"
                         onChangeBookShelf={changeBookShelf}
                         books={this.db.getCurrentlyReading()}/>
              <BookShelf title="Want to Read"
                         onChangeBookShelf={changeBookShelf}
                         books={this.db.getWantToRead()}/>
              <BookShelf title="Read"
                         onChangeBookShelf={changeBookShelf}
                         books={this.db.getRead()}/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        </Loading>
      </div>
    )
  }
}

export default HomePage
