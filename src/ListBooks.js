import BookShelf from './Bookshelf';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
const { Header, Content } = Layout;

const ListBooks = ({ books, onChangeBookShelf }) => {
  const wantToRead = books.filter(book => book.shelf === 'wantToRead');
  const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
  const read = books.filter(book => book.shelf === 'read');
  return (
    <Layout>
      <Header>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <h1 className="header-title">My Reads</h1>
          </Col>
          <Col span={12}>
            <Row type="flex" justify="end">
              <Col>
                <Link to="/search">Search Books</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Content>
        <BookShelf
          onChangeBookShelf={onChangeBookShelf}
          books={currentlyReading}
          title="Currently Reading"
        />
        <BookShelf onChangeBookShelf={onChangeBookShelf} books={wantToRead} title="Want to Read" />
        <BookShelf onChangeBookShelf={onChangeBookShelf} books={read} title="Read" />
      </Content>
    </Layout>
  );
};

export default ListBooks;
