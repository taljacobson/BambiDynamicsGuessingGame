
import React, { Suspense } from 'react';
import './App.css';
import { useAppSelector } from './app/hooks';
import { selectPage } from './features/pageStore';
import GameFormPage from './pages/gameForm';
import GamePage from './pages/gamePage';
import IntroPage from './pages/intro';

function App() {
  const currentPage = useAppSelector(selectPage)

  return (
    <div className="App">
      <header className="App-header">
        <Suspense fallback={() => <div>Loading</div>}>
          {currentPage === 'intro' && <IntroPage />}
          {currentPage === 'game' && <GamePage />}
          {currentPage === 'form' && <GameFormPage />}
        </Suspense>
      </header>
    </div>
  );
}

export default App;
