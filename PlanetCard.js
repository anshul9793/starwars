
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResidentList from './ResidentList';
import './PlanetCard.css';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentsData = await Promise.all(
        planet.residents.map(async (resident) => {
          const response = await axios.get(resident);
          return response.data;
        })
      );
      setResidents(residentsData);
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <h3>Residents:</h3>
      <ResidentList residents={residents} />
    </div>
  );
};

export default PlanetCard;
