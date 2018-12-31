import React from "react";
import PropTypes from "prop-types";

const listObjectProprties = props => {
  const { object, highlights = []} = props;

  const renderObjectProperties = object => {
    let result = [];
    for (let property in object) {
      result.push(
        <li key={property} className={highlights.includes(property) ? "highlight " + property : property} >
          {property} = {object[property]}
        </li>
      );
    }
    return result;
  };

  return <ul className="object-list">{renderObjectProperties(object)}</ul>;
};

listObjectProprties.propTypes = {
  object: PropTypes.object.isRequired,
  highlights: PropTypes.array // Array of property names to add CSS .higlight classs into <li> element
};

export default listObjectProprties;
