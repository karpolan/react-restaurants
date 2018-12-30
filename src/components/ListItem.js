import React from "react";
import PropTypes from "prop-types";

const jsxObjectPropsAsListItems = object => {
  let result = null;
  for (let property in object) {
    console.log(property);
    result += (
      <li key={property}>
        <span className="name">{property}</span>
        <span className="value">{object[property]}</span>
      </li>
    );
  }
  return result;
};

const ListItem = props => {
  const {
    id,
    name = "",
    status = "",
    sortingValues = [],
    isFavorite = false
  } = props.item;

  return (
    <div className="list-item">
      <p className="id">id: {id}</p>
      <h3 className="name"  onClick={() => props.onClick(props.item)}>{name}</h3>
      <p className="status">status: {status}</p>
      <div className="sortingValues">
        <h4>Sorting Values</h4>
        <ul>{ jsxObjectPropsAsListItems(sortingValues)}</ul>
      </div>
      <label>
        Favorite
        <input
          name="isFavorite"
          type="checkbox"
          checked={isFavorite}
          onChange={() => props.onFavoriteChange(props.item)}
        />
      </label>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onFavoriteChange: PropTypes.func
};

export default ListItem;
