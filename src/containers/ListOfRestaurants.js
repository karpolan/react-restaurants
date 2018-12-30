import React, { Component } from "react";
import { List } from "./../components";
import { getStorage } from "./../storage";

export class ListOfRestaurants extends Component {
  list = null;

  onListItemClick = (item) => {
    alert(`Item {item.id} clicked`);
  }

  onListItemFavoriteChange = (item) => {
    alert(`Item {item.id} favorite changed`);
  }

  componentWillMount() {
    this.list = getStorage().restaurants;
  }

  render() {
    return (
      <div className="ListOfRestaurants">
        <List items={this.list} onItemClick={this.onListItemClick} onItemFavoriteChange={this.onListItemFavoriteChange} />
      </div>
    );
  }
}

export default ListOfRestaurants;
