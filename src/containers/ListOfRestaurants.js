import React, { Component } from "react";
import { List, Filter } from "./../components";
import { getStorage } from "../storage/storage";
import { compareSortRestaurants } from "./../storage";

export class ListOfRestaurants extends Component {
  list = null;

  constructor(props) {
    super(props);
    this.state = { 
      searchText: '',
      sortKind: 0 
    };
  }

  componentWillMount() {
    this.list = [...getStorage().restaurants];
  }

  getFilterdList() {
    let result = [];

    // Text Search filter (ignore case)
    const search = this.state.searchText.trim().toLowerCase();
    if (search !== '') {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name.toLowerCase().includes(search)) result.push(this.list[i]);
      }
    } else result = [...this.list];

    // We are sorting rest elemets of array depending on the current sortKind. 
    // Then run again from bottom to top, moving every found favorite to the top, 
    // that makes multiply favorites be sored in the same way.
    let sorted = [...result];

    sorted.sort(compareSortRestaurants.get(this.state.sortKind))

/*
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].isFavorite)
    }
*/
    return sorted;
  }

  onListItemClick = item => {
    alert(`Item {item.id} clicked`);
  };

  onListItemFavoriteChange = item => {
    // Todo: Change this to Redux Action or other storage/state solution
    item.isFavorite = !item.isFavorite;
    this.forceUpdate(); // We don't use React setState() so update component manually
  };

  onSearchChange = event => {
    this.setState({searchText: event.target.value})
  };

  onSortChange = event => {
    const value = Number(event.target.value);
    this.setState({sortKind: value})
  };

  render() {
    return (
      <div className="ListOfRestaurants">
        <Filter
          isDebug={this.props.isDebug}
          searchText={this.state.searchText}
          sortKind={this.state.sortKind}
          onSearchChange={this.onSearchChange}
          onSortChange={this.onSortChange}
        />
        <List
          isDebug={this.props.isDebug}
          items={this.getFilterdList()}
          onItemClick={this.onListItemClick}
          onItemFavoriteChange={this.onListItemFavoriteChange}
          sortKind={this.state.sortKind}
        />
        <Filter
          isDebug={this.props.isDebug}
          searchText={this.state.searchText}
          sortKind={this.state.sortKind}
          onSearchChange={this.onSearchChange}
          onSortChange={this.onSortChange}
        />
      </div>
    );
  }
}

export default ListOfRestaurants;
