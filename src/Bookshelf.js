import React from 'react';
import { Divider, List, Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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
                <RadioGroup
                  onChange={e => changeBookShelf(e.target.value)}
                  defaultValue={item.shelf || 'none'}
                >
                  <RadioButton value="none">None</RadioButton>
                  <RadioButton value="read">Read</RadioButton>
                  <RadioButton value="wantToRead">Want to Read</RadioButton>
                  <RadioButton value="currentlyReading">Currently Reading</RadioButton>
                </RadioGroup>
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
