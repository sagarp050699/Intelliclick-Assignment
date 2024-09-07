import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityRow from './CityRow';


const API_URL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=20&start=';

function CitiesTable() {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    setLoading(true);
    const result = await axios.get(`${API_URL}${page}&facet=timezone&facet=country`);
    setCities(prevCities => [...prevCities, ...result.data.records]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCities();
  }, [page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
    setCities([]);
    fetchCities();
  };

  const handleScroll = (e) => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const filteredCities = cities.filter(city =>
    city.fields.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table-container">
      <h1>City Weather Forecast</h1>
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <table className="cities-table">
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <CityRow key={city.recordid} city={city} />
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default CitiesTable;
