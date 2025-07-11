import React from 'react';
import './TransitionOverlay.css';

function TransitionOverlay({ onAnimationEnd }) {
  return (
    <div className="transition-overlay" onAnimationEnd={onAnimationEnd}></div>
  );
}

export default TransitionOverlay;