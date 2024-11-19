import axios from 'axios';
import './styles.css';
import { POKEMON_API_URL } from '../../Config';
import { useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import RegionButton from '../../Components/RegionButton/RegionButton';

import kanthoImage from './assets/kantho-starters.svg';
import johtoImage from './assets/johto-starters.svg';
import hoennImage from './assets/hoenn-starters.svg';
import sinnohImage from './assets/sinnoh-starters.svg';
import unovaImage from './assets/unova-starters.svg';
import kalosImage from './assets/kalos-starters.svg';
import alolaImage from './assets/alola-starters.svg';
import galarImage from './assets/galar-starters.svg';

const Regions = () => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [selectedGeneration, setSelectedGeneration] = useState(() => {
        // Inicializa com a geração salva no localStorage ou null
        return parseInt(localStorage.getItem('selectedGeneration'), 10) || null;
    });
    const [showButtons, setShowButtons] = useState(() => {
        // Mostra ou oculta os botões com base no localStorage
        const savedGeneration = localStorage.getItem('selectedGeneration');
        return !savedGeneration; // Mostra os botões se nenhuma geração foi salva
    });

    const generationRanges = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386],
        4: [387, 494],
        5: [495, 649],
        6: [650, 721],
        7: [722, 809],
        8: [810, 898],
    };

    const regionStarterImage = (gen) => {
        switch (gen) {
            case 1:
                return kanthoImage;
            case 2:
                return johtoImage;
            case 3:
                return hoennImage;
            case 4:
                return sinnohImage;
            case 5:
                return unovaImage;
            case 6:
                return kalosImage;
            case 7:
                return alolaImage;
            case 8:
                return galarImage;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`${POKEMON_API_URL}?limit=1025`);
                const pokemonList = response.data.results.map((pokemon, index) => ({
                    ...pokemon,
                    id: index + 1,
                    sprite: `https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`,
                }));
                setAllPokemon(pokemonList);
            } catch (error) {
                console.error('Erro ao buscar Pokémon:', error);
            }
        };

        fetchPokemon();
    }, []);

    useEffect(() => {
        // Salva os estados no localStorage
        if (selectedGeneration !== null) {
            localStorage.setItem('selectedGeneration', selectedGeneration);
        }
        localStorage.setItem('showButtons', showButtons);
    }, [selectedGeneration, showButtons]);

    const filteredPokemon = selectedGeneration
        ? allPokemon.filter((pokemon) => {
            const [start, end] = generationRanges[selectedGeneration];
            return pokemon.id >= start && pokemon.id <= end;
        })
        : allPokemon;

    const handleRegionClick = (generation) => {
        setSelectedGeneration(generation);
        setShowButtons(false);
    };

    const handleBack = () => {
        setShowButtons(true);
        setSelectedGeneration(null);
        localStorage.removeItem('selectedGeneration'); // Limpa o estado salvo
    };

    return (
        <div className="regions-container">
            <h3 className="regions-title">Regions</h3>
            <div className="regions">
                {showButtons ? (
                    <div className="region-buttons">
                        {Object.keys(generationRanges).map((generation) => (
                            <RegionButton
                                key={generation}
                                onToggleClick={() => handleRegionClick(parseInt(generation))}
                                image={regionStarterImage(parseInt(generation))}
                                number={parseInt(generation)}
                            />
                        ))}
                    </div>
                ) : (
                    <button onClick={handleBack}>Voltar</button>
                )}
                <div className="pokemon-list">
                    {!showButtons &&
                        filteredPokemon.map((pokemon) => (
                            <Card
                                key={pokemon.id}
                                id={pokemon.id}
                                image={pokemon.sprite}
                                name={pokemon.name}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Regions;