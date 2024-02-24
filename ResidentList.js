
import React from 'react';

const ResidentList = ({ residents }) => {
  return (
    <ul className="resident-list">
      {residents.map((resident, index) => (
        <li key={index}>
          <h4>{resident.name}</h4>
          <p>Gender: {resident.gender}</p>
          <p>Birth Year: {resident.birth_year}</p>
        </li>
      ))}
    </ul>
  );
};

export default ResidentList;
