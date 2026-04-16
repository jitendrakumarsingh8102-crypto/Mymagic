import React, { useState } from 'react';
import HomeView from './components/HomeView';
import FirstMeetView from './components/FirstMeetView';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app-container">
      {currentView === 'home' && (
        <HomeView onNavigate={() => setCurrentView('first-meet')} />
      )}
      {currentView === 'first-meet' && (
        <FirstMeetView onNavigate={() => setCurrentView('home')} />
      )}
    </div>
  );
}

export default App;
