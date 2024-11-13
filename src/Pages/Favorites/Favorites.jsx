import './styles.css';
import magikarpIcon from './assets/magikarp-background.svg';

const Favorites = () => {
    return (
        <div className='favorites-container'>
            <div className="no-favorites">
                <img className='favorites-image--background' src={magikarpIcon} alt="magikarp background" />
                <h4 className='favorite-text--description'>{'You didn`t favorite any Pokémon :('}</h4>
                <p className="favorite-text--hint">Click on the heart icon of your <br />favorite Pokémon and they will appear here.</p>
            </div>
        </div>
    );
}

export default Favorites;