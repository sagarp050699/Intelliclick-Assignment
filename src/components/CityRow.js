import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function CityRow({ city }) {
  return (
    <tr>
      <td>
        <Link to={`/weather/${city.fields.name}/${city.fields.country}`}>
          {city.fields.name}
        </Link>
      </td>
      <td>{city.fields.country}</td>
      <td>{city.fields.timezone}</td>
    </tr>
  );
}

export default CityRow;
