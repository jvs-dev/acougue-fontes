import React from 'react';
import MeatCard from '../meatcard/MeatCard';
import './ListOfMeats.css';

function ListOfMeats({ meats }) {  
  
  return (
    <div className="meat-list-section">
      <h2 className="section-title">TODAS AS CARNES</h2>
      <div className="meat-cards-container">
        {meats.map((meat) => (
          <MeatCard key={meat.id} meat={meat} />
        ))}
      </div>
    </div>
  );
}

export default ListOfMeats;