
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './components/PlanetCard';
import './App.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await axios.get(url);
      setPlanets((prevPlanets) => [...prevPlanets, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const loadMorePlanets = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPlanets = filteredPlanets.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.name.localeCompare(b.name);
  });

  return (
    <div>
      <div className="navbar">
        <h1>Star Wars :) </h1>
        <div className="search-sort">
          <input
            type="text"
            placeholder="Search planets..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="App">
        <div className="planets-container">
          {sortedPlanets.map((planet) => (
            <PlanetCard key={planet.name} planet={planet} />
          ))}
        </div>
        <button onClick={loadMorePlanets} className="load-more">
          Load More
        </button>
      </div>
      <div className="footer">
        <p>&copy; Star Wars by anshul:) </p>
      </div>
    </div>
  );
};

export default App;
