import React from "react";
import PropTypes from "prop-types";
import "./List.css";
import ListItem from "./ListItem";


const list = props => {
  const { items, onItemClick, onItemFavoriteChange, isDebug } = props;

  const renderList = () => {
    return items.map((item, i) => (
      <ListItem
        key={i}
        item={item}
        onClick={onItemClick}
        onFavoriteChange={onItemFavoriteChange}
        isDebug={isDebug}
      />
    ));
  };

  const renderEmpty = () => (
    <div className="empty">Not found</div>
  );

  return (
    <div className="list">
      {(items.length > 0) ? renderList() : renderEmpty()}
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
