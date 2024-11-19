/* eslint-disable no-unused-vars */
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { POKEMON_API_URL } from '../../Config';
import Loading from '../../Components/Loading/Loading';
import { FavoritesContext } from '../../Config/FavoritesContext';

import bugIcon from '../../assets/icons/bug-big.svg';
import darkIcon from '../../assets/icons/dark-big.svg';
import dragonIcon from '../../assets/icons/dragon-big.svg';
import electricIcon from '../../assets/icons/electric-big.svg';
import fairyIcon from '../../assets/icons/fairy-big.svg';
import fightingIcon from '../../assets/icons/fighting-big.svg';
import fireIcon from '../../assets/icons/fire-big.svg';
import flyingIcon from '../../assets/icons/flying-big.svg';
import ghostIcon from '../../assets/icons/ghost-big.svg';
import grassIcon from '../../assets/icons/grass-big.svg';
import groundIcon from '../../assets/icons/ground-big.svg';
import iceIcon from '../../assets/icons/ice-big.svg';
import normalIcon from '../../assets/icons/normal-big.svg';
import poisonIcon from '../../assets/icons/poison-big.svg';
import psychicIcon from '../../assets/icons/psychic-big.svg';
import rockIcon from '../../assets/icons/rock-big.svg';
import steelIcon from '../../assets/icons/steel-big.svg';
import waterIcon from '../../assets/icons/water-big.svg';

import bugIconSmall from '../../assets/iconsSmall/bug-icon-small.svg';
import darkIconSmall from '../../assets/iconsSmall/dark-icon-small.svg';
import dragonIconSmall from '../../assets/iconsSmall/dragon-icon-small.svg';
import electricIconSmall from '../../assets/iconsSmall/electric-icon-small.svg';
import fairyIconSmall from '../../assets/iconsSmall/fairy-icon-small.svg';
import fightingIconSmall from '../../assets/iconsSmall/fighting-icon-small.svg';
import fireIconSmall from '../../assets/iconsSmall/fire-icon-small.svg';
import flyingIconSmall from '../../assets/iconsSmall/flying-icon-small.svg';
import ghostIconSmall from '../../assets/iconsSmall/ghost-icon-small.svg';
import grassIconSmall from '../../assets/iconsSmall/grass-icon-small.svg';
import groundIconSmall from '../../assets/iconsSmall/ground-icon-small.svg';
import iceIconSmall from '../../assets/iconsSmall/ice-icon-small.svg';
import normalIconSmall from '../../assets/iconsSmall/normal-icon-small.svg';
import poisonIconSmall from '../../assets/iconsSmall/poison-icon-small.svg';
import psychicIconSmall from '../../assets/iconsSmall/psychic-icon-small.svg';
import rockIconSmall from '../../assets/iconsSmall/rock-icon-small.svg';
import steelIconSmall from '../../assets/iconsSmall/steel-icon-small.svg';
import waterIconSmall from '../../assets/iconsSmall/water-icon-small.svg';

import favoriteIcon from './assets/favorites-icon.svg';
import favoriteActiveIcon from './assets/favorites-active-icon.svg';

const PokemonDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [sound, setSound] = useState(null);
    const [description, setDescription] = useState('');
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const [weaknesses, setWeaknesses] = useState([]);

    const getTypeWeaknesses = async (types) => {
        try {
            const promises = types.map((type) =>
                Axios.get(`https://pokeapi.co/api/v2/type/${type}`).then((res) => res.data.damage_relations)
            );

            const [type1Relations, type2Relations] = await Promise.all(promises);

            const damageMultipliers = {};

            const applyMultipliers = (relations, multiplier) => {
                relations.forEach((type) => {
                    damageMultipliers[type.name] = (damageMultipliers[type.name] || 1) * multiplier;
                });
            };

            applyMultipliers(type1Relations.double_damage_from, 2);
            applyMultipliers(type1Relations.half_damage_from, 0.5);
            applyMultipliers(type1Relations.no_damage_from, 0);

            if (type2Relations) {
                applyMultipliers(type2Relations.double_damage_from, 2);
                applyMultipliers(type2Relations.half_damage_from, 0.5);
                applyMultipliers(type2Relations.no_damage_from, 0);
            }

            const weaknesses = Object.entries(damageMultipliers)
                .filter(([_, multiplier]) => multiplier > 1)
                .map(([type, multiplier]) => ({ type, multiplier }));

            return weaknesses;
        } catch (error) {
            console.error("Erro ao buscar fraquezas:", error);
            return [];
        }
    };

    useEffect(() => {
        // Realizar as duas requisições em paralelo
        const fetchPokemonData = async () => {
            try {
                const pokemonResponse = await Axios.get(`${POKEMON_API_URL}/${id}`);
                const speciesResponse = await Axios.get(`${POKEMON_API_URL}-species/${id}`);

                setPokemon(pokemonResponse.data);
                setSound(pokemonResponse.data.cries?.latest || null);
                setDescription(speciesResponse.data.flavor_text_entries[16].flavor_text);

                // Buscar fraquezas
                const types = pokemonResponse.data.types.map((type) => type.type.name);
                const weaknessesData = await getTypeWeaknesses(types);
                setWeaknesses(weaknessesData);
            } catch (error) {
                console.error("Erro ao buscar os dados do Pokémon:", error);
            }
        };

        fetchPokemonData();

    }, [id]);

    const playAudio = () => {
        if (sound) {
            const audio = new Audio(sound);
            audio.volume = 0.1;
            audio.play();
        }
    };


    const caseType = () => {
        switch (pokemonType()) {
            case 'bug':
                return bugIcon;

            case 'dark':
                return darkIcon;

            case 'dragon':
                return dragonIcon;

            case 'electric':
                return electricIcon;

            case 'fairy':
                return fairyIcon;

            case 'fighting':
                return fightingIcon;

            case 'fire':
                return fireIcon;

            case 'flying':
                return flyingIcon;

            case 'ghost':
                return ghostIcon;

            case 'grass':
                return grassIcon;

            case 'ground':
                return groundIcon;

            case 'ice':
                return iceIcon;

            case 'normal':
                return normalIcon;

            case 'poison':
                return poisonIcon;

            case 'psychic':
                return psychicIcon;

            case 'rock':
                return rockIcon;

            case 'steel':
                return steelIcon;

            case 'water':
                return waterIcon;
        }
    }

    const caseTypeSmall = (type) => {
        switch (type) {
            case 'bug':
                return bugIconSmall;

            case 'dark':
                return darkIconSmall;

            case 'dragon':
                return dragonIconSmall;

            case 'electric':
                return electricIconSmall;

            case 'fairy':
                return fairyIconSmall;

            case 'fighting':
                return fightingIconSmall;

            case 'fire':
                return fireIconSmall;

            case 'flying':
                return flyingIconSmall;

            case 'ghost':
                return ghostIconSmall;

            case 'grass':
                return grassIconSmall;

            case 'ground':
                return groundIconSmall;

            case 'ice':
                return iceIconSmall;

            case 'normal':
                return normalIconSmall;

            case 'poison':
                return poisonIconSmall;

            case 'psychic':
                return psychicIconSmall;

            case 'rock':
                return rockIconSmall;

            case 'steel':
                return steelIconSmall;

            case 'water':
                return waterIconSmall;
        }
    }

    const pokemonType = () => {
        return pokemon.types[0].type.name;
    }

    const caseColor = (type) => {
        switch (type) {
            case 'bug':
                return 'bug';

            case 'dark':
                return 'dark';

            case 'dragon':
                return 'dragon';

            case 'electric':
                return 'electric';

            case 'fairy':
                return 'fairy';

            case 'fighting':
                return 'fighting';

            case 'fire':
                return 'fire';

            case 'flying':
                return 'flying';

            case 'ghost':
                return 'ghost';

            case 'grass':
                return 'grass';

            case 'ground':
                return 'ground';

            case 'ice':
                return 'ice';

            case 'normal':
                return 'normal';

            case 'poison':
                return 'poison';

            case 'psychic':
                return 'psychic';

            case 'rock':
                return 'rock';

            case 'steel':
                return 'steel';

            case 'water':
                return 'water';
        }
    }

    const caseColor2 = () => {
        switch (pokemonType()) {
            case 'bug':
                return 'bug';

            case 'dark':
                return 'dark';

            case 'dragon':
                return 'dragon';

            case 'electric':
                return 'electric';

            case 'fairy':
                return 'fairy';

            case 'fighting':
                return 'fighting';

            case 'fire':
                return 'fire';

            case 'flying':
                return 'flying';

            case 'ghost':
                return 'ghost';

            case 'grass':
                return 'grass';

            case 'ground':
                return 'ground';

            case 'ice':
                return 'ice';

            case 'normal':
                return 'normal';

            case 'poison':
                return 'poison';

            case 'psychic':
                return 'psychic';

            case 'rock':
                return 'rock';

            case 'steel':
                return 'steel';

            case 'water':
                return 'water';
        }
    }

    const firstUpperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const threeZerosAfterId = (id) => {
        return String(id).padStart(4, '0');
    }

    const addDotBeforeLastDigit = (num) => {
        let numStr = num.toString();
        let result = numStr.slice(0, -1) + '.' + numStr.slice(-1);
        return parseFloat(result);
    }

    function cmToMeters(cm) {
        return cm / 10;
    }

    return (
        <div className='details-container'>
            {pokemon ? (
                <>
                    <div className='details-image--container'>
                        <div className="arrow-container">
                            <i
                                className='material-icons arrow'
                                onClick={() => navigate(-1)}
                            >
                                arrow_back_ios
                            </i>
                        </div>
                        <div className='background-image' style={{ backgroundColor: `var(--clr-${caseColor2(pokemonType())})`, background: `linear-gradient(145deg, var(--clr-${caseColor2(pokemonType())}) 0%, #fff 100%)` }}>
                            <img className='details-icon--background' src={caseType(pokemonType())} alt={`${pokemonType()} icon`} />
                        </div>
                        <img className='details-pokemon-image' src={`https://img.pokemondb.net/artwork/vector/${pokemon.name}.png`} alt={pokemon.name} />
                        <div className="favorite-container">
                            <img className='favorite-icon' onClick={() => toggleFavorite(pokemon.id)} src={favorites.includes(pokemon.id) ? favoriteActiveIcon : favoriteIcon} alt={'favorite icon'} />
                        </div>
                    </div>
                    <div className="details-text--container">
                        <h1 className='details-name'>{firstUpperCase(pokemon.name)}</h1>
                        <p className='details-id'>Nº{threeZerosAfterId(pokemon.id)}</p>
                        <div className="details-types--container">
                            {pokemon.types.map((type) => {
                                return <span key={Math.random() * 10} className='details-type--item' style={{ backgroundColor: `var(--clr-${caseColor(type.type.name)})` }}>
                                    <div className="details-type-icon--container">
                                        <img src={caseTypeSmall(type.type.name)} alt={`${type.type.name} icon small`} />
                                    </div>
                                    <p className='details-type-name'>{firstUpperCase(type.type.name)}</p>
                                </span>
                            })
                            }
                        </div>
                    </div>
                    <div className="details-description--container">
                        <p className='description-text'>{description}</p>
                    </div>
                    <div className="details-stats--container">
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >balance</i>WEIGHT</p>
                            <p className='stats-item-text'>{addDotBeforeLastDigit(pokemon.weight)} Kg</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >height</i>HEIGHT</p>
                            <p className='stats-item-text'>{cmToMeters(pokemon.height)} m</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >ballot</i>ABILITY</p>
                            <p className='stats-item-text' style={{ fontSize: '.95em' }}>{firstUpperCase(pokemon.abilities[0].ability.name)}</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >volume_up</i>CRIES</p>
                            <p className='stats-item-text'><span className='material-icons play' onMouseDown={() => playAudio()}>play_circle</span></p>
                        </div>
                    </div>
                    <hr />
                    <p className="stats-title" style={{ margin: '1em' }}>Base Stats:</p>
                    <div className="details-stats--container">
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >favorite</i>{pokemon.stats[0].stat.name.toUpperCase()}</p>
                            <p className='stats-item-text'>{pokemon.stats[0].base_stat}</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >local_fire_department</i>{pokemon.stats[1].stat.name.toUpperCase()}</p>
                            <p className='stats-item-text'>{pokemon.stats[1].base_stat}</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >shield</i>{pokemon.stats[2].stat.name.toUpperCase()}</p>
                            <p className='stats-item-text'>{pokemon.stats[2].base_stat}</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >local_fire_department</i>{pokemon.stats[3].stat.name.toUpperCase()}</p>
                            <p className='stats-item-text'>{pokemon.stats[3].base_stat}</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >shield</i>{pokemon.stats[4].stat.name.toUpperCase()}</p>
                            <p className='stats-item-text'>{pokemon.stats[4].base_stat}</p>
                        </div>
                        <div className='stats-item'>
                            <p className='stats-item-title'><i className="material-icons icon" >speed</i>{pokemon.stats[5].stat.name.toUpperCase()}</p>
                            <p className='stats-item-text'>{pokemon.stats[5].base_stat}</p>
                        </div>
                    </div>
                    <hr />
                    <p className='weaknesses-title' style={{ margin: '1em' }}>Weaknesses:</p>
                    <div className="weaknesses-list">
                        {weaknesses.map((weakness) => {
                            return <div key={weakness.type} className='weaknesses-item' style={{ backgroundColor: `var(--clr-${caseColor(weakness.type)})` }}>
                                <div className="details-type-icon--container">
                                    <img src={caseTypeSmall(weakness.type)} alt={`${weakness.type} icon`} />
                                </div>
                                <p className='weaknesses-name'>{firstUpperCase(weakness.type)}</p>
                            </div>

                        })}
                    </div>
                    <hr />
                </>
            ) : (
                <Loading
                    size={65}
                    color={'var(--clr-dark-blue)'}
                />
            )
            }
        </div >
    );
}

export default PokemonDetails;