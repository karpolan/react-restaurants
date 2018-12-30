import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const list = props => {
  const { items, onItemClick, onItemFavoriteChange } = props;
  return (
    <div className="list">
      {items.map((item, i) => (
        <ListItem
          key={i}
          item={item}
          onClick={onItemClick}
          onFavoriteChange={onItemFavoriteChange}
        />
      ))}
    </div>
  );
};

list.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  onItemFavoriteChange: PropTypes.func
};

export default list;
