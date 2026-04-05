import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { HomeIcon, History, User, SunMoon } from "lucide-react";
import '../styles/dock.css';

export default function AppleStyleDock({ toggleTheme }) {
  const navigate = useNavigate(); 
  const data = [
    { title: "Dashboard", icon: <HomeIcon />, path: '/' },
    { title: "Transactions", icon: <History />, path: '/transactions' },
    { title: "User", icon: <User />, path: '/user' }, 
  ];

  return (
    <div className="dock-container">
      <nav className="dock">
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className="dock-item"
            onClick={() => navigate(item.path)}
          >
            <span className="dock-label">{item.title}</span>
            <span className="dock-icon">{item.icon}</span>
          </div>
        ))}
        <div style={{ width: '1px', height: '2rem', backgroundColor: 'var(--border)', margin: '0 4px' }}></div>
        <div className="dock-item" onClick={toggleTheme}>
          <span className="dock-label">Switch Theme</span>
          <span className="dock-icon"><SunMoon /></span>
        </div>
      </nav>
    </div>
  );
}