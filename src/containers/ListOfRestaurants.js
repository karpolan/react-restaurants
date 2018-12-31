import React, { Component } from "react";
import { List, Filter } from "./../components";
import { getStorage, getFilterdRestaurantsList } from "./../storage";

export class ListOfRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      sortKind: 0
    };
  }

  getList() {
    return getStorage().restaurants;
  }

  getFilterdList() {
    return getFilterdRestaurantsList(
      this.getList(),
      this.state.searchText,
      this.state.sortKind
    );
  }

  onListItemClick = item => {
    // Todo: Route to Restaurant Details  
    alert(`Item "${item.name}" id: ${item.id} clicked`);
  };

  onListItemFavoriteChange = item => {
    // Todo: Change this to Redux Action or other storage/state solution
    item.isFavorite = !item.isFavorite;
    this.forceUpdate(); // We don't use React setState() so update component manually
  };

  onSearchChange = event => {
    this.setState({ searchText: event.target.value });
  };

  onSortChange = event => {
    const value = Number(event.target.value);
    this.setState({ sortKind: value });
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
