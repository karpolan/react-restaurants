import React, { Component } from "react";
import { List, Filter } from "./../components";
import { getStorage } from "./../storage";
import { compareKindRestaurants } from "./../storage/reataurants"

export class ListOfRestaurants extends Component {
  list = null;

  constructor(props) {
    super(props);
    this.state = { 
      isDebug: false,
      searchText: '',
      sortKind: 0 
    };
  }

  componentWillMount() {
    this.list = [...getStorage().restaurants];
  }

  getFilterdList() {
    console.log("getFilterdList()");
    let result = [];

    // Text Search filter
    const search = this.state.searchText.trim();
    if (search !== '') {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].name.includes(search)) result.push(this.list[i]);
      }
    } else result = [...this.list];

    // We are sorting rest elemets of array depending on the current sortKind. 
    // Then run again from bottom to top, moving every found favorite to the top, 
    // that makes multiply favorites be sored in the same way
    let sorted = [...result];

    sorted.sort(compareKindRestaurants.get(this.state.sortKind))

/*
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].isFavorite)
    }
*/
    return sorted;
  }

  onDebugChange = event => {
    let flag = event.target.value;
    if (event.target.type === 'checkbox') flag = event.target.checked;
    this.setState({isDebug: flag});
  };

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
          isDebug={this.state.isDebug}
          searchText={this.state.searchText}
          sortKind={this.state.sortKind}
          onSearchChange={this.onSearchChange}
          onSortChange={this.onSortChange}
          onDebugChange={this.onDebugChange}
        />
        <List
          isDebug={this.state.isDebug}
          items={this.getFilterdList()}
          onItemClick={this.onListItemClick}
          onItemFavoriteChange={this.onListItemFavoriteChange}
        />
        <Filter
          isDebug={this.state.isDebug}
          searchText={this.state.searchText}
          sortKind={this.state.sortKind}
          onSearchChange={this.onSearchChange}
          onSortChange={this.onSortChange}
          onDebugChange={this.onDebugChange}
        />
      </div>
    );
  }
}

export default ListOfRestaurants;
