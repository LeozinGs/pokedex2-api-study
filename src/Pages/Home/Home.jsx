import { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './styles.css';
import Axios from 'axios';
import { IMAGE_API_URL, POKEMON_API_URL } from '../../Config';
import Loading from '../../Components/Loading/Loading';
import Card from '../../Components/Card/Card';

const Home = () => {

    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        Axios.get(POKEMON_API_URL + '?limit=1025')
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {

                    const { results } = res.data;
                    let newPokemonData = [];

                    results.forEach((pokemon, index) => {
                        index++;
                        let pokemonObject = {
                            id: index,
                            url: IMAGE_API_URL + index + '.png',
                            name: pokemon.name,
                        }
                        newPokemonData.push(pokemonObject);

                    });
                    setPokemonData(newPokemonData);
                }
            });
    }, []);

    return (
        <main className='container'>
            <SearchBar />
            <div className="cards--container">
                {pokemonData ?
                    pokemonData.map((pokemon) => {
                        return <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            image={pokemon.url}
                            name={pokemon.name}
                        />
                    })
                    :
                    <Loading
                        size={65}
                        color={'var(--clr-dark-blue)'}
                    />
                }
            </div>
        </main>
    );
}

export default Home;