import BookShelf from './Bookshelf';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Row, Col, Icon } from 'antd';
import { search } from './BooksAPI';

const { Header, Content } = Layout;

class SearchBooks extends Component {
  state = {
    results: []
  };

  search = async query => {
    if (!query) return this.clearSearch();
    const results = await search(query);
    if (results.error) return this.clearSearch();
    const resultsMap = results.map(result => {
      const book = this.props.books.find(book => book.id === result.id);
      return Object.assign({}, result, book);
    });

    this.setState({
      results: resultsMap
    });
  };

  clearSearch = () => {
    this.setState({
      results: []
    });
  };
  render() {
    return (
      <Layout>
        <Header>
          <Row type="flex" justify="left" gutter={16}>
            <Col>
              <Link to="/">
                <Icon type="arrow-left" />
              </Link>
            </Col>
            <Col>
              <h1 className="header-title">Search</h1>
            </Col>
            <Col span={12}>
              <Input
                type="text"
                placeholder="Search books"
                onChange={event => this.search(event.target.value)}
              />
            </Col>
          </Row>
        </Header>
        <Content>
          <BookShelf
            onChangeBookShelf={this.props.onChangeBookShelf}
            books={this.state.results}
            title="Results"
          />
        </Content>
      </Layout>
    );
  }
}

export default SearchBooks;
