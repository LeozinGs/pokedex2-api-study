import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import { useEffect, useState } from 'react';
import Intro from './Components/Intro/Intro';
import TransitionPage from './Components/TransitionPage/TransitionPage';
import PokemonDetails from './Pages/PokemonDetails/PokemonDetails';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(true);
    }, 2000);
  }, []);

  if (isLoading === false) {
    setTimeout(() => {
      setIsTransitioning(false);
    }, 50);
  }

  return (
    <>
      {isLoading ?
        <Intro />
        :
        isTransitioning ?
          <TransitionPage />
          :
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/pokemon/:id' element={<PokemonDetails />} />
              </Route>
            </Routes>
          </Router>
      }
    </>
  );
}

export default App;
