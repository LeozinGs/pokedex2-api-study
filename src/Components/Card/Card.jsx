import { useEffect, useState } from 'react';
import './styles.css';
import Axios from 'axios';
import { POKEMON_API_URL } from '../../Config';
import Loading from '../Loading/Loading';

import favoriteIcon from './assets/favorites-icon.svg';
import favoriteIconActive from './assets/favorites-active-icon.svg';

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
import { Link } from 'react-router-dom';

const Card = ({ id, image, name, isFavorite, onToggleFavorite }) => {

    const [pokemonCard, setPokemonCard] = useState(null);

    useEffect(() => {
        Axios.get(POKEMON_API_URL + '/' + id)
            .then((res) => {
                setPokemonCard(res.data);
            });
    }, [id]);

    const caseType = () => {
        switch (pokemonCard.types[0].type.name) {
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
        pokemonCard.types[0].type.name;
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
        switch (pokemonCard.types[0].type.name) {
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

    const firstLetterUpperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='card-wrapper'>
            <img src={isFavorite ? favoriteIconActive : favoriteIcon} alt="Favorite icon" className={`favorite-btn ${isFavorite ? 'favorited' : ''}`} onClick={onToggleFavorite} />
            <Link
                to={`/pokemon/${id}`}
                style={{ textDecoration: 'none', color: '#000' }}
            >
                {pokemonCard ?
                    <div key={id} className='card' style={{ background: `var(--clr-${caseColor2(pokemonType)}-light)` }}>
                        <div className="card-text--container">
                            <p className='card-id'>Nº{String(id).padStart(4, '0')}</p>
                            <h3 className='card-pokemon-name'>{firstLetterUpperCase(name)}</h3>
                            <div className="card-types--container">
                                {pokemonCard.types.map((type) => {
                                    return <span key={Math.random() * 10000} className='card-type--item' style={{ background: `var(--clr-${caseColor(type.type.name)})` }}>
                                        <div className="card-type-icon--container">
                                            <img src={caseTypeSmall(type.type.name)} alt={`${type.type.name} icon small`} />
                                        </div>
                                        <p className='card-type-name'>{firstLetterUpperCase(type.type.name)}</p>
                                    </span>
                                })
                                }
                            </div>
                        </div>
                        <div className="card-image--container" style={{ background: `var(--clr-${caseColor2(pokemonType)})` }}>
                            <img className='background-icon' src={caseType(pokemonType)} alt={`${pokemonType} big icon`} />
                            <img className='card-image' src={image} alt={`${name} image`} />
                        </div>
                    </div>
                    :
                    <Loading
                        size={40}
                        color={'var(--clr-light-grey)'}
                    />
                }
            </Link>
        </div>

    );
}

export default Card;