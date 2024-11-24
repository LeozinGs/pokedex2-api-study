import { useEffect, useState, useRef } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './styles.css';
import Axios from 'axios';
import { POKEMON_API_URL } from '../../Config';
import Loading from '../../Components/Loading/Loading';
import Card from '../../Components/Card/Card';

const Home = () => {
    const [pokemonData, setPokemonData] = useState([]); // Apenas nome e ID inicialmente
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [visiblePokemon, setVisiblePokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(false); // Indicador de carregamento de detalhes
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(
        () => localStorage.getItem('selectedType') || ''
    );

    const observerRef = useRef(null);

    useEffect(() => {
        // Carrega apenas os nomes e IDs inicialmente
        Axios.get(POKEMON_API_URL + `?limit=893`)
            .then((res) => {
                const { results } = res.data;
                const minimalData = results.map((pokemon, index) => ({
                    id: index + 1,
                    name: pokemon.name,
                    sprite: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${idUpdater(index + 1)}.png`,
                }));
                setPokemonData(minimalData);
                setFilteredPokemonData(minimalData);
                setLoading(false);

                // Carregar tipos de Pokémon uma vez
                fetchAllTypes(minimalData);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const idUpdater = (id) => {
        return String(id).padStart(3, '0');
    }

    const fetchAllTypes = async (data) => {
        const promises = data.map((pokemon) =>
            Axios.get(`${POKEMON_API_URL}/${pokemon.id}`).then((res) => ({
                id: pokemon.id,
                name: pokemon.name,
                sprite: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${idUpdater(pokemon.id)}.png`,
                types: res.data.types.map((typeInfo) => typeInfo.type.name),
            }))
        );

        setLoadingDetails(true);
        const detailedData = await Promise.all(promises);
        setPokemonData(detailedData);

        // Extrai os tipos únicos
        const allTypes = new Set(detailedData.flatMap((pokemon) => pokemon.types));
        setTypes(Array.from(allTypes));

        setLoadingDetails(false);

        // Aplica o filtro automaticamente caso haja um tipo salvo
        if (selectedType) {
            handleTypeFilter(selectedType, detailedData);
        }
    };

    useEffect(() => {
        if (!filteredPokemonData) return;

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index, 10);
                    if (!visiblePokemon.includes(index)) {
                        setVisiblePokemon((prev) => [...prev, index]);
                    }
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '200px',
            threshold: 0.1,
        });

        const cards = document.querySelectorAll('.card-placeholder');
        cards.forEach((card) => observerRef.current.observe(card));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [filteredPokemonData, visiblePokemon]);

    const handleSearch = (query) => {
        if (!query) {
            setFilteredPokemonData(pokemonData);
            setVisiblePokemon([]);
            return;
        }

        const isNumeric = !isNaN(query);
        if (isNumeric) {
            const pokemonById = pokemonData.find((pokemon) => pokemon.id === parseInt(query));
            setFilteredPokemonData(pokemonById ? [pokemonById] : []);
        } else {
            const pokemonByName = pokemonData.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPokemonData(pokemonByName);
        }
        setVisiblePokemon([]);
    };

    const handleTypeFilter = (type, data = pokemonData) => {
        setSelectedType(type);
        localStorage.setItem('selectedType', type);

        if (!type) {
            setFilteredPokemonData(data);
            return;
        }

        const filteredByType = data.filter((pokemon) => pokemon.types?.includes(type));
        setFilteredPokemonData(filteredByType);
    };

    return (
        <div className="home-container">
            <h3 className="home-title">PokéDex</h3>
            <main className="container">
                <SearchBar onSearch={handleSearch} />

                <div className="filter-container">
                    <select
                        id="type-filter"
                        value={selectedType}
                        onChange={(e) => handleTypeFilter(e.target.value)}
                        disabled={loadingDetails}
                    >
                        <option value="">All types</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="cards--container">
                    {loading ? (
                        <Loading size={65} color={'var(--clr-dark-blue)'} />
                    ) : (
                        filteredPokemonData.map((pokemon, index) => (
                            <div
                                key={pokemon.id}
                                className="card-placeholder"
                                data-index={index}
                            >
                                {visiblePokemon.includes(index) ? (
                                    <Card
                                        id={pokemon.id}
                                        image={pokemon.sprite}
                                        name={pokemon.name}
                                    />
                                ) : (
                                    <div className="card-skeleton">Loading...<br /><br /><br /></div>
                                )}
                            </div>
                        ))
                    )}
                    {loadingDetails && <Loading size={40} color={'var(--clr-dark-blue)'} />}
                </div>
            </main>
        </div>
    );
};

export default Home;