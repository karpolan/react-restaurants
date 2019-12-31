import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders <ul> list for "props.object" with all properties as <li> items.
 * Property name added to <li> element as CSS class.
 * By passing array of property names in "props.highlights" the matching <li> elements
 * will be "highlighted" with "highlight" CSS class.
 */
const ObjectProperties = (props) => {
  const { object, highlights = [] } = props;

  const renderObjectProperties = (object) => {
    let result = [];
    for (let property in object) {
      result.push(
        <li key={property} className={highlights.includes(property) ? 'highlight ' + property : property}>
          {property} = {object[property]}
        </li>
      );
    }
    return result;
  };

  return <ul className="object-properties">{renderObjectProperties(object)}</ul>;
};

ObjectProperties.propTypes = {
  object: PropTypes.object.isRequired,
  highlights: PropTypes.array, // Array of property names to add CSS .highlight classes into <li> element
};

export default ObjectProperties;
