import React from "react";
import PropTypes from "prop-types";
import ListObjectProps from "./ObjectProprties";
import { propertySortRestaurants } from "../../../storage";
import "./ListItem.css";

// Renders single "restaurnats list" item for given "props.item".
// When "props.isDebug" renders additional view with "id", "sortingValues", etc.
// Event "props.onFavoriteChange" binded to "favorite" checbox.
// Event "props.onClick" binded to "name" header.
// All CSS styles are set in "./ListItem.css" file.
const listItem = props => {
  const {
    id,
    name = "",
    status = "",
    sortingValues = {},
    isFavorite = false
  } = props.item;

  const renderDebug = () => {
    if (!props.isDebug) return null;

    return (
      <div className="debug">
        <p className="id">id: {id}</p>
        <div className="sortingValues">
          <ListObjectProps
            object={sortingValues}
            highlights={[propertySortRestaurants.get(props.sortKind)]}
          />
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
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={() => props.onFavoriteChange(props.item)}
          />
          favorite
        </label>
        <p className="sort">
          {sortingValues[propertySortRestaurants.get(props.sortKind)]}
        </p>
      </div>
      {renderDebug()}
    </div>
  );
};

listItem.propTypes = {
  item: PropTypes.object.isRequired,
  sortKind: PropTypes.number,
  onClick: PropTypes.func,
  onFavoriteChange: PropTypes.func,
  isDebug: PropTypes.bool
};

export default listItem;
