import { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './styles.css';
import Axios from 'axios';
import { IMAGE_API_URL, POKEMON_API_URL } from '../../Config';
import Loading from '../../Components/Loading/Loading';
import Card from '../../Components/Card/Card';

const Home = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [filteredPokemonData, setFilteredPokemonData] = useState(null);
    const [visiblePokemonCount, setVisiblePokemonCount] = useState(10); // Mostra 10 Pokémon inicialmente
    const [loadingMore, setLoadingMore] = useState(false);

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
                        };
                        newPokemonData.push(pokemonObject);
                    });
                    setPokemonData(newPokemonData);
                    setFilteredPokemonData(newPokemonData);  // Inicializa com todos os dados
                }
            });
    }, []);

    const handleSearch = async (query) => {
        // Se o input estiver vazio, restaura os dados originais
        if (!query) {
            setFilteredPokemonData(pokemonData); // Volta a mostrar todos os Pokémon
            return;
        }

        const isNumeric = !isNaN(query);
        if (isNumeric) {
            // Busca por ID
            const pokemonById = pokemonData.find(pokemon => pokemon.id === parseInt(query));
            setFilteredPokemonData(pokemonById ? [pokemonById] : []);
        } else {
            // Busca por nome ou tipo
            const pokemonByName = pokemonData.filter(pokemon =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            );

            if (pokemonByName.length === 0) {
                try {
                    const typeRes = await Axios.get(`${POKEMON_API_URL}/type/${query.toLowerCase()}`);
                    const pokemonByType = typeRes.data.pokemon.map(p => p.pokemon.name);
                    const pokemonByTypeData = pokemonData.filter(pokemon => pokemonByType.includes(pokemon.name));
                    setFilteredPokemonData(pokemonByTypeData);
                } catch (error) {
                    console.error(error, "Tipo de Pokémon não encontrado");
                    setFilteredPokemonData([]);
                }
            } else {
                setFilteredPokemonData(pokemonByName);
            }
        }
    };

    // Função para carregar mais Pokémon ao rolar para o fim
    const loadMorePokemon = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        setVisiblePokemonCount((prevCount) => prevCount + 10);
        setLoadingMore(false);
    };

    // Monitorar o scroll para carregar mais Pokémon
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
            ) {
                loadMorePokemon();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingMore]);

    return (
        <main className='container'>
            <SearchBar onSearch={handleSearch} />
            <div className="cards--container">
                {filteredPokemonData ? (
                    filteredPokemonData.slice(0, visiblePokemonCount).map((pokemon) => (
                        <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            image={pokemon.url}
                            name={pokemon.name}
                        />
                    ))
                ) : (
                    <Loading size={65} color={'var(--clr-dark-blue)'} />
                )}
                {loadingMore && <Loading size={40} color={'var(--clr-dark-blue)'} />}
            </div>
        </main>
    );
}

export default Home;