import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';
import ListObjectProps from './ListObjectProprties';

const ListItem = props => {
  const {
    id,
    name = "",
    status = "",
    sortingValues = {},
    isFavorite = false
  } = props.item;

  const renderDebug = () => {
    if (process.env.NODE_ENV === "production") return null;

    return (
      <div class="debug">
        <p className="id">id: {id}</p>
        <div className="sortingValues">
          <ListObjectProps object={sortingValues} />
        </div>
      </div>
    )
  };

  return (
    <div className="list-item">
      <div className="info">
        <h3 className="name" onClick={() => props.onClick(props.item)}>{name}</h3>
        <p className="status">{status}</p>
        <label className="isFavorite">
          favorite
          <input
            name="isFavorite"
            type="checkbox"
            checked={isFavorite}
            onChange={() => props.onFavoriteChange(props.item)}
          />
        </label>
      </div>
      {renderDebug()}
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onFavoriteChange: PropTypes.func
};

export default ListItem;
