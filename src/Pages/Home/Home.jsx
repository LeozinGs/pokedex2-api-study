// import { useEffect, useState } from 'react';
// import SearchBar from '../../Components/SearchBar/SearchBar';
// import './styles.css';
// import Axios from 'axios';
// import { IMAGE_API_URL, POKEMON_API_URL } from '../../Config';
// import Loading from '../../Components/Loading/Loading';
// import Card from '../../Components/Card/Card';

// const Home = () => {
//     const [pokemonData, setPokemonData] = useState(null);
//     const [filteredPokemonData, setFilteredPokemonData] = useState(null);
//     const [visiblePokemonCount, setVisiblePokemonCount] = useState(10); // Mostra 10 Pokémon inicialmente
//     const [loadingMore, setLoadingMore] = useState(false);
//     const [favorites, setFavorites] = useState(() => {
//         return JSON.parse(localStorage.getItem("favorites")) || [];
//     });

//     useEffect(() => {
//         Axios.get(POKEMON_API_URL + `?limit=1025`)
//             .then((res) => {
//                 if (res.status >= 200 && res.status < 300) {
//                     const { results } = res.data;
//                     let newPokemonData = [];

//                     results.forEach((pokemon, index) => {
//                         index++;
//                         let pokemonObject = {
//                             id: index,
//                             url: IMAGE_API_URL + index + '.png',
//                             name: pokemon.name,
//                         };
//                         newPokemonData.push(pokemonObject);
//                     });
//                     setPokemonData(newPokemonData);
//                     setFilteredPokemonData(newPokemonData);  // Inicializa com todos os dados
//                 }
//             });
//     }, []);

//     const handleSearch = async (query) => {
//         // Se o input estiver vazio, restaura os dados originais
//         if (!query) {
//             setFilteredPokemonData(pokemonData); // Volta a mostrar todos os Pokémon
//             return;
//         }

//         const isNumeric = !isNaN(query);
//         if (isNumeric) {
//             // Busca por ID
//             const pokemonById = pokemonData.find(pokemon => pokemon.id === parseInt(query));
//             setFilteredPokemonData(pokemonById ? [pokemonById] : []);
//         } else {
//             // Busca por nome ou tipo
//             const pokemonByName = pokemonData.filter(pokemon =>
//                 pokemon.name.toLowerCase().includes(query.toLowerCase())
//             );

//             if (pokemonByName.length === 0) {
//                 try {
//                     const typeRes = await Axios.get(`${POKEMON_API_URL}/type/${query.toLowerCase()}`);
//                     const pokemonByType = typeRes.data.pokemon.map(p => p.pokemon.name);
//                     const pokemonByTypeData = pokemonData.filter(pokemon => pokemonByType.includes(pokemon.name));
//                     setFilteredPokemonData(pokemonByTypeData);
//                 } catch (error) {
//                     console.log(error, "Tipo de Pokémon não encontrado");
//                     setFilteredPokemonData([]);
//                 }
//             } else {
//                 setFilteredPokemonData(pokemonByName);
//             }
//         }
//     };

//     const loadMorePokemon = () => {
//         if (loadingMore) return;
//         setLoadingMore(true);
//         setVisiblePokemonCount((prevCount) => prevCount + 10);
//         setLoadingMore(false);
//     };

//     useEffect(() => {
//         const handleScroll = () => {
//             const cardsContainer = document.querySelector('.cards--container');
//             if (!cardsContainer) return;

//             const lastVisibleCard = cardsContainer.children[visiblePokemonCount - 1];
//             if (lastVisibleCard) {
//                 const lastCardOffset = lastVisibleCard.getBoundingClientRect().bottom;
//                 const pageOffset = window.innerHeight + window.scrollY;

//                 // Carrega mais Pokémon quando a posição do último card visível está perto do final da tela
//                 if (pageOffset >= lastCardOffset - 200) {
//                     loadMorePokemon();
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [loadingMore, visiblePokemonCount]);

//     useEffect(() => {
//         localStorage.setItem("favorites", JSON.stringify(favorites));
//     }, [favorites]);

//     const toggleFavorite = (id) => {
//         setFavorites((prevFavorites) =>
//             prevFavorites.includes(id)
//                 ? prevFavorites.filter(favId => favId !== id)
//                 : [...prevFavorites, id]
//         );
//     };

//     return (
//         <main className='container'>
//             <SearchBar onSearch={handleSearch} />
//             <div className="cards--container">
//                 {filteredPokemonData ? (
//                     filteredPokemonData.slice(0, visiblePokemonCount).map((pokemon) => (
//                         <Card
//                             key={pokemon.id}
//                             id={pokemon.id}
//                             image={pokemon.url}
//                             name={pokemon.name}
//                             isFavorite={favorites.includes(pokemon.id)}
//                             onToggleFavorite={() => toggleFavorite(pokemon.id)}
//                         />
//                     ))
//                 ) : (
//                     <Loading size={65} color={'var(--clr-dark-blue)'} />
//                 )}
//                 {loadingMore && <Loading size={40} color={'var(--clr-dark-blue)'} />}
//             </div>
//         </main>
//     );
// }

// export default Home;

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
    const [visiblePokemon, setVisiblePokemon] = useState([]); // Índices dos Pokémon visíveis
    const [loading, setLoading] = useState(true);
    const observerRef = useRef(null);

    useEffect(() => {
        Axios.get(POKEMON_API_URL + `?limit=1025`)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    const { results } = res.data;
                    const newPokemonData = results.map((pokemon, index) => ({
                        id: index + 1,
                        url: IMAGE_API_URL + (index + 1) + '.png',
                        name: pokemon.name,
                        sprite: `https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`,
                    }));
                    setPokemonData(newPokemonData);
                    setFilteredPokemonData(newPokemonData);
                    setLoading(false);
                }
            });
    }, []);

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
            rootMargin: '200px', // Carrega antes de entrar na visualização
            threshold: 0.1, // Quando 10% estiver visível
        });

        const cards = document.querySelectorAll('.card-placeholder');
        cards.forEach((card) => observerRef.current.observe(card));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [filteredPokemonData, visiblePokemon]);

    const handleSearch = async (query) => {
        if (!query) {
            setFilteredPokemonData(pokemonData);
            setVisiblePokemon([]); // Reinicia os Pokémon visíveis
            return;
        }

        const isNumeric = !isNaN(query);
        if (isNumeric) {
            const pokemonById = pokemonData.find(pokemon => pokemon.id === parseInt(query));
            setFilteredPokemonData(pokemonById ? [pokemonById] : []);
        } else {
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
                    console.log(error, "Tipo de Pokémon não encontrado");
                    setFilteredPokemonData([]);
                }
            } else {
                setFilteredPokemonData(pokemonByName);
            }
        }
        setVisiblePokemon([]); // Reinicia os Pokémon visíveis após busca
    };

    return (
        <main className='container'>
            <SearchBar onSearch={handleSearch} />
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