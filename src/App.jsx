import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard'; 
import Transactions from './pages/Transactions'; 
import AppleStyleDock from './pages/dock';  
import USer from './pages/user';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div style={{ paddingBottom: '6rem', minHeight: '100vh' }}> 
        
        <header style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--text1)' }}>
            Zorvyn 
          </h1>
        </header>
        <main style={{ padding: '0 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/user" element={<USer/>} />
          </Routes>
        </main>
        <AppleStyleDock toggleTheme={toggleTheme} /> 
      </div>
    </Router>
  );
}