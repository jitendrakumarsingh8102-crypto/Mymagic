import React, { useState } from 'react';
import HomeView from './components/HomeView';
import FirstMeetView from './components/FirstMeetView';
import MomentsView from './components/MomentsView';
import ShreyaLetterView from './components/ShreyaLetterView';
import UsInDelhiView from './components/UsInDelhiView';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app-container">
      {currentView === 'home' && (
        <HomeView 
          onNavigate={() => setCurrentView('first-meet')} 
          onNavigateMoments={() => setCurrentView('moments')}
          onNavigateShreya={() => setCurrentView('shreya')}
          onNavigateDelhi={() => setCurrentView('delhi')}
        />
      )}
      {currentView === 'first-meet' && (
        <FirstMeetView 
          onNavigate={() => setCurrentView('home')} 
          onNavigateMoments={() => setCurrentView('moments')}
        />
      )}
      {currentView === 'moments' && (
        <MomentsView onNavigate={() => setCurrentView('home')} />
      )}
      {currentView === 'shreya' && (
        <ShreyaLetterView onNavigate={() => setCurrentView('home')} />
      )}
      {currentView === 'delhi' && (
        <UsInDelhiView onNavigate={() => setCurrentView('home')} />
      )}
    </div>
  );
}

export default App;
