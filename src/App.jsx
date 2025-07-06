import React from 'react';
import Header from './components/header/Header';
import MeatForm from './components/MeatForm';
import MeatList from './components/MeatList';
import './App.css'; // Or index.css if you prefer

function App() {
  // Dummy data for demonstration. In a real app, this would come from an API or state management.
  const meats = [
    {
      id: 1,
      name: 'CONTRA FILÉ',
      price: 24.90,
      category: 'Bovino',
      utility: ['Churrasco', 'Feijoada'],
      image: '/images/contra-file.png', // Placeholder for image
    },
    {
      id: 2,
      name: 'CONTRA FILÉ',
      price: 24.90,
      category: 'Bovino',
      utility: ['Churrasco', 'Feijoada'],
      image: '/images/contra-file.png',
    },
    {
      id: 3,
      name: 'CONTRA FILÉ',
      price: 24.90,
      category: 'Bovino',
      utility: ['Churrasco', 'Feijoada'],
      image: '/images/contra-file.png',
    },
  ];

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <MeatForm />
        <MeatList meats={meats} />
      </div>
    </div>
  );
}

export default App;