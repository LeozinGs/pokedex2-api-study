import './styles.css';
import magikarpIcon from './assets/magikarp-background.svg';
import { IMAGE_API_URL, POKEMON_API_URL } from '../../Config';
import { useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import axios from 'axios';

const Favorites = () => {

    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    });
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        axios.get(POKEMON_API_URL + '?limit=1025').then((res) => {
            if (res.status >= 200 && res.status < 300) {
                const { results } = res.data;
                const newPokemonData = results
                    .map((pokemon, index) => ({
                        id: index + 1,
                        url: IMAGE_API_URL + (index + 1) + '.png',
                        sprite: `https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`,
                        name: pokemon.name,
                    }))
                    .filter(pokemon => favorites.includes(pokemon.id));
                setPokemonData(newPokemonData);
            }
        });
    }, [favorites]);

    const toggleFavorite = (id) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        setPokemonData((prevData) =>
            prevData.filter((pokemon) => pokemon.id !== id)
        );
    };

    return (
        <div className='favorite-page'>
            <h3 className="favorites-title">Favorites</h3>
            <div className="cards--container">
                {pokemonData && pokemonData.length > 0 ? (
                    pokemonData.map((pokemon) => (
                        <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            image={pokemon.sprite}
                            name={pokemon.name}
                            isFavorite={true}
                            onToggleFavorite={() => toggleFavorite(pokemon.id)}
                        />
                    ))
                ) : (
                    <div className="no-favorites">
                        <img className='favorites-image--background' src={magikarpIcon} alt="magikarp background" />
                        <h4 className='favorite-text--description'>{'You didn`t favorite any Pokémon :('}</h4>
                        <p className="favorite-text--hint">Click on the heart icon of your <br />favorite Pokémon and they will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;