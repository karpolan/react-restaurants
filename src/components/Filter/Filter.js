import React from "react";
import PropTypes from "prop-types";
import { titleSortRestaurants } from "../../storage";
import "./Filter.css";

// Renders set of controls to perform the text search and to choose the sorting
// method for the list of restaurants.
// Can be used multiply number on the same page, in the Top and Bottom, etc.
// Some CSS styles are set in "./List.css" file.
const filter = props => {
  const { searchText, sortKind, onSearchChange, onSortChange } = props;

  const renderOptions = (list) => {
    const result = [];
    list.forEach((value, key) => { result.push(<option key={key} value={key}>{value}</option>) });  
    return result;
  }

  return (
    <div className="filter">
      <label className="search">
        Search
        <input type="text" value={searchText} onChange={onSearchChange} />
      </label>

      <label className="sort">
        Sort
        <select value={sortKind} onChange={onSortChange}>
          { renderOptions(titleSortRestaurants) }
        </select>
      </label>
    </div>
  );
};

filter.propTypes = {
  searchText: PropTypes.string,
  sortKind: PropTypes.number,
  onSearchChange: PropTypes.func,
  onSortChange: PropTypes.func,
  isDebug: PropTypes.bool
};

export default filter;
