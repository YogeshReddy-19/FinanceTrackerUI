import React from 'react';
import BorderGlow from './BorderGlow';
import '../styles/card.css';

const Card = ({ title, amount, icon, trend, isPositive }) => {
  return (
    <BorderGlow
      edgeSensitivity={30}
      backgroundColor="var(--card)" 
      glowColor="var(--accent)"   
      borderRadius={16} 
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated={false}
      colors={['var(--border)', 'var(--accent)']} 
    >
      <div className="card-content" >
        <div className="cardheader" >
          <div>
            <h3 className="cardtitle">{title}</h3>
            <p className="cardamount" >{amount}</p>
          </div>
          <div className="cardicon" >{icon}</div>
        </div>
        
        {trend && (
          <div className="card-trend">
            <span className={isPositive ? 'trend-positive' : 'trend-negative'}>
              {trend}
            </span>
            <span className="trend-text">vs last month</span>
          </div>
        )}
      </div>
    </BorderGlow>
  );
};

export default Card;