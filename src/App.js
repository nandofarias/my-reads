import React, { Component } from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { getAll, update } from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    myBooks: []
  };

  async componentDidMount() {
    const books = await getAll();
    this.setState({
      myBooks: books
    });
  }

  onChangeBookShelf = async (book, shelf) => {
    await update(book, shelf);
    this.setState(state => {
      const newBook = Object.assign({}, book, { shelf });
      const filteredBooks = state.myBooks.filter(myBook => myBook.id !== book.id);
      return {
        myBooks: [...filteredBooks, newBook]
      };
    });
  };
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={this.state.myBooks} onChangeBookShelf={this.onChangeBookShelf} />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchBooks
              onChangeBookShelf={async (book, shelf) => {
                await this.onChangeBookShelf(book, shelf);
                history.push('/');
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
