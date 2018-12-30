import React from "react";
import PropTypes from "prop-types";

const listObjectProprties = props => {
  const { object } = props;

  const renderObjectProperties = object => {
    let result = [];
    for (let property in object) {
      result.push(
        <li key={property} className="object-list-item">
          {property} = {object[property]}
        </li>
      );
    }
    return result;
  };

  return <ul className="object-list">{renderObjectProperties(object)}</ul>;
};

listObjectProprties.propTypes = {
  object: PropTypes.object.isRequired
};

export default listObjectProprties;
