import { useEffect, useState, useRef } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './styles.css';
import Axios from 'axios';
import { IMAGE_API_URL, POKEMON_API_URL } from '../../Config';
import Loading from '../../Components/Loading/Loading';
import Card from '../../Components/Card/Card';

const Home = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [filteredPokemonData, setFilteredPokemonData] = useState(null);
    const [visiblePokemon, setVisiblePokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(
        () => localStorage.getItem('selectedType') || '' // Restaura do localStorage
    );
    const observerRef = useRef(null);

    const fetchPokemonDetails = async (results) => {
        const promises = results.map((pokemon) =>
            Axios.get(pokemon.url).then((res) => {
                const { id, types } = res.data;
                return {
                    id,
                    name: pokemon.name,
                    url: IMAGE_API_URL + id + '.png',
                    sprite: `https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`,
                    types: types.map((typeInfo) => typeInfo.type.name),
                };
            })
        );

        return Promise.all(promises);
    };

    useEffect(() => {
        Axios.get(POKEMON_API_URL + `?limit=1025`)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    const { results } = res.data;

                    fetchPokemonDetails(results).then((detailedPokemonData) => {
                        setPokemonData(detailedPokemonData);
                        setFilteredPokemonData(detailedPokemonData);

                        const allTypes = new Set(
                            detailedPokemonData.flatMap((pokemon) => pokemon.types)
                        );
                        setTypes(Array.from(allTypes));
                        setLoading(false);

                        // Aplica o filtro ao carregar a página se houver um tipo selecionado
                        if (selectedType) {
                            handleTypeFilter(selectedType, detailedPokemonData);
                        }
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedType]);

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
        localStorage.setItem('selectedType', type); // Salva o tipo selecionado no localStorage

        if (!type) {
            setFilteredPokemonData(data);
            return;
        }

        const filteredByType = data.filter((pokemon) => pokemon.types.includes(type));
        setFilteredPokemonData(filteredByType);
    };

    return (
        <main className="container">
            <h3 className="home-title">PokéDex</h3>
            <SearchBar onSearch={handleSearch} />

            <div className="filter-container">
                <select
                    id="type-filter"
                    value={selectedType}
                    onChange={(e) => handleTypeFilter(e.target.value)}
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
                                <div className="card-skeleton">Loading...</div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default Home;