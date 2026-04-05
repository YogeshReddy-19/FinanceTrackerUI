import React from 'react';
import '../styles/user.css';
import BorderGlow from './BorderGlow';
function UCard({ children }) {
  return (
    <BorderGlow>
    <div className="u-card">
      {children}
    </div>
    </BorderGlow>
  );
}
export default  UCard;