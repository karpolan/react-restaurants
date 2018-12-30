import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';


const filter = props => {
	const { searchText, sortKind, onSearchChange, onSortChange } = props;

  const renderDebug = () => {
    if (process.env.NODE_ENV === "production") return null;

		const { isDebug, onDebugChange } = props;
    return (
			<label className="debug">
				<input
					type="checkbox"
					checked={isDebug}
					onChange={onDebugChange}
				/>
				Show Debug Info
			</label>
    )
  };

	return (
		<div className="filter">

			<label className="search">
				Search
				<input
					type="text"
					value={searchText}
					onChange={onSearchChange}
				/>
			</label>

			{renderDebug()}

			<label className="sort">
				Sort
				<select value={sortKind} onChange={onSortChange}>
					<option value="0">[none]</option>
					<option value="1">best match</option>
					<option value="2">newest</option>
					<option value="3">rating average</option>
					<option value="4">distance</option>
					<option value="5">popularity</option>
					<option value="6">average product price</option>
					<option value="7">delivery costs</option>
					<option value="8">minimum costs</option>
					<option value="9">top restaurant</option>
				</select>
			</label>
			
		</div>
	)
};	

filter.propTypes = {
	searchText: PropTypes.string,
	sortKind: PropTypes.number, 
	onSearchChange: PropTypes.func,
	onSortChange: PropTypes.func
};

export default filter;
