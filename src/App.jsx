import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Pages/Home/Home';
import { useEffect, useState } from 'react';
import Intro from './Components/Intro/Intro';
import TransitionPage from './Components/TransitionPage/TransitionPage';
import PokemonDetails from './Pages/PokemonDetails/PokemonDetails';
import Regions from './Pages/Regions/Regions';
import Favorites from './Pages/Favorites/Favorites';
import { FavoritesProvider } from './Config/FavoritesContext';

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

          <FavoritesProvider>
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/pokemon/:id' element={<PokemonDetails />} />
                  <Route path='/regions' element={<Regions />} />
                  <Route path='/favorites' element={<Favorites />} />
                </Route>
              </Routes>
            </Router>
          </FavoritesProvider>

      }
    </>
  );
}

export default App;
