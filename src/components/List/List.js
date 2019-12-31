import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem/ListItem';
import './List.css';

/**
 * Renders "restaurants list" for given "props.items" array.
 * Shows "Not Found" message if there is no list items.
 * Events "props.onItemClick", "props.onItemFavoriteChange" are sent to every list item component as according props.
 * Some CSS styles are set in "./List.css" file.
 */
const List = (props) => {
  const { items, sortKind, onItemClick, onItemFavoriteChange, isDebug } = props;

  const renderList = () => {
    return items.map((item, i) => (
      <ListItem
        key={i}
        item={item}
        onClick={onItemClick}
        onFavoriteChange={onItemFavoriteChange}
        isDebug={isDebug}
        sortKind={sortKind}
      />
    ));
  };

  const renderEmpty = () => <div className="empty">Not found</div>;

  return <div className="list">{items.length > 0 ? renderList() : renderEmpty()}</div>;
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  sortKind: PropTypes.number,
  onItemClick: PropTypes.func,
  onItemFavoriteChange: PropTypes.func,
  isDebug: PropTypes.bool,
};

export default List;
