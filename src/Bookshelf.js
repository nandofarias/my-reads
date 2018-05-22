import React from 'react';
import { Divider, List, Button } from 'antd';
const Bookshelf = ({ title, books, onChangeBookShelf }) => {
  return (
    <div style={{ padding: '0 140px' }}>
      <Divider>{title}</Divider>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={books}
        renderItem={item => {
          const changeBookShelf = shelf => onChangeBookShelf(item, shelf);
          return (
            <List.Item
              actions={[
                <Button onClick={() => changeBookShelf('read')}> Read </Button>,
                <Button onClick={() => changeBookShelf('wantToRead')}>Want to Read</Button>,
                <Button onClick={() => changeBookShelf('currentlyReading')}>
                  Currently Reading
                </Button>
              ]}
              key={item.id}
              extra={
                item.imageLinks && <img width={150} alt="logo" src={item.imageLinks.thumbnail} />
              }
            >
              <List.Item.Meta
                title={<a href={item.canonicalVolumeLink}> {item.title} </a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Bookshelf;
