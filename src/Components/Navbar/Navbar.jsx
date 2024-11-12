import './styles.css';
import pokeballIcon from './assets/pokeball-icon.svg';
import regionsIcon from './assets/regions-icon.svg';
import favoritesIcon from './assets/favorites-icon.svg'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to={'/'}>
                <div className='icon-container'>
                    <img className='icon-item' src={pokeballIcon} alt="Navbar Icon" />
                </div>
            </Link>
            <Link to={'/regions'}>
                <div className='icon-container'>
                    <img className='icon-item' src={regionsIcon} alt="Navbar Icon" />
                </div>
            </Link>
            <Link to={'/favorites'}>
                <div className='icon-container'>
                    <img className='icon-item' src={favoritesIcon} alt="Navbar Icon" />
                </div>
            </Link>
        </div>
    );
}

export default Navbar;