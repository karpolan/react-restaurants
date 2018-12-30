import React from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";

const list = props => {
  const { items, onItemClick, onItemFavoriteChange, isDebug } = props;
  return (
    <div className="list">
      {items.map((item, i) => (
        <ListItem
          key={i}
          item={item}
          onClick={onItemClick}
          onFavoriteChange={onItemFavoriteChange}
          isDebug={isDebug}
        />
      ))}
    </div>
  );
};

list.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  onItemFavoriteChange: PropTypes.func,
  isDebug: PropTypes.bool
};

export default list;
