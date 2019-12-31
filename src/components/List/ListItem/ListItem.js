import React from 'react';
import PropTypes from 'prop-types';
import ListObjectProps from './ObjectProperties';
import { propertySortRestaurants } from '../../../storage';
import './ListItem.css';

/**
 * Renders single "restaurants list" item for given "props.item".
 * When "props.isDebug" is set, renders additional view with "id", "sortingValues", etc.
 * Event "props.onFavoriteChange" bind to "favorite" checkbox.
 * Event "props.onClick" bind to "name" header.
 * All CSS styles are set in "./ListItem.css" file.
 */
const ListItem = (props) => {
  const { id, name = '', status = '', sortingValues = {}, isFavorite = false } = props.item;

  const renderDebug = () => {
    if (!props.isDebug) return null;

    return (
      <div className="debug">
        <p className={props.sortKind < 1 ? 'id highlight' : 'id'}>id: {id}</p>
        <div className="sortingValues">
          <ListObjectProps object={sortingValues} highlights={[propertySortRestaurants.get(props.sortKind)]} />
        </div>
      </div>
    );
  };

  return (
    <div className="list-item">
      <div className="info">
        <h3 className="name" onClick={() => props.onClick(props.item)}>
          {name}
        </h3>
        <p className="status">{status}</p>
        <label className="favorite">
          <input type="checkbox" checked={isFavorite} onChange={() => props.onFavoriteChange(props.item)} />
          favorite
        </label>
        <p className="sort">{sortingValues[propertySortRestaurants.get(props.sortKind)]}</p>
      </div>
      {renderDebug()}
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  sortKind: PropTypes.number,
  onClick: PropTypes.func,
  onFavoriteChange: PropTypes.func,
  isDebug: PropTypes.bool,
};

export default ListItem;
