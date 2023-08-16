import React from 'react';
import './FloatingIcon.css'; // Créez ce fichier CSS pour styliser l'icône flottant
const FloatingIcon = ({ onClick }) => {
 
  return (

    <div className="floating-icon" onClick={onClick}>


         <span>+</span>
    </div>
  );
};

export default FloatingIcon;
