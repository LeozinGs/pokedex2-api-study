import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import pokeballIcon from './assets/pokeball-icon.svg';
import regionsIcon from './assets/regions-icon.svg';
import favoritesIcon from './assets/favorites-icon.svg';
import pokeballIconActive from './assets/pokeball-active-icon.svg';  // Corrigido o caminho do ícone ativo
import regionsIconActive from './assets/regions-active-icon.svg';  // Corrigido o caminho do ícone ativo
import favoritesIconActive from './assets/favorites-active-icon.svg';  // Corrigido o caminho do ícone ativo

const Navbar = () => {
    const location = useLocation(); // Pega a localização atual

    // Função para definir o ícone e o texto com base na rota ativa
    const getIconAndText = (path) => {
        switch (path) {
            case '/':
                return {
                    icon: location.pathname === '/' ? pokeballIconActive : pokeballIcon,
                    text: location.pathname === '/' ? 'Pokedex' : ''
                };
            case '/regions':
                return {
                    icon: location.pathname === '/regions' ? regionsIconActive : regionsIcon,
                    text: location.pathname === '/regions' ? 'Regions' : ''
                };
            case '/favorites':
                return {
                    icon: location.pathname === '/favorites' ? favoritesIconActive : favoritesIcon,
                    text: location.pathname === '/favorites' ? 'Favorites' : ''
                };
            default:
                return { icon: pokeballIcon, text: '' };
        }
    };

    return (
        <div className="navbar">
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <div className='icon-container'>
                    <img className='icon-item' src={getIconAndText('/').icon} alt="Pokémon" />
                    {getIconAndText('/').text && <span className='link-item'>{getIconAndText('/').text}</span>}
                </div>
            </Link>
            <Link to={'/regions'} style={{ textDecoration: 'none' }}>
                <div className='icon-container'>
                    <img className='icon-item' src={getIconAndText('/regions').icon} alt="Regiões" />
                    {getIconAndText('/regions').text && <span className='link-item'>{getIconAndText('/regions').text}</span>}
                </div>
            </Link>
            <Link to={'/favorites'} style={{ textDecoration: 'none' }}>
                <div className='icon-container'>
                    <img className='icon-item' src={getIconAndText('/favorites').icon} alt="Favoritos" />
                    {getIconAndText('/favorites').text && <span className='link-item'>{getIconAndText('/favorites').text}</span>}
                </div>
            </Link>
        </div>
    );
};

export default Navbar;