import './styles.css';
import kanthoBackground from './assets/kantho-background.svg';
import johtoBackground from './assets/johto-background.svg';
import hoennBackground from './assets/hoenn-background.svg';
import sinnohBackground from './assets/sinnoh-background.svg';
import unovaBackground from './assets/unova-background.svg';
import kalosBackground from './assets/kalos-background.svg';
import alolaBackground from './assets/alola-background.svg';
import galarBackground from './assets/galar-background.svg';

const RegionButton = ({ onToggleClick, image, number }) => {

    const changeBackgroundImage = (n) => {
        switch (n) {
            case 1:
                return kanthoBackground;

            case 2:
                return johtoBackground;

            case 3:
                return hoennBackground;

            case 4:
                return sinnohBackground;

            case 5:
                return unovaBackground;

            case 6:
                return kalosBackground;

            case 7:
                return alolaBackground;

            case 8:
                return galarBackground;
        }
    }

    const regionName = (gen) => {
        switch (gen) {
            case 1:
                return 'Kantho';

            case 2:
                return 'Johto';

            case 3:
                return 'Hoenn';

            case 4:
                return 'Sinnoh';

            case 5:
                return 'Unova';

            case 6:
                return 'Kalos';

            case 7:
                return 'Alola';

            case 8:
                return 'Galar';

        }
    }

    return (
        <div className="region-button" onClick={onToggleClick} style={{ backgroundImage: `url(${changeBackgroundImage(number)})` }}>
            <div className="overlay">
                <img src={image} alt="image of the starters of this region" className="region-starters--sprites" />
                <div className="region-name--container">
                    <h3 className='region-name'>{regionName(number)}</h3>
                    <p className="region-generation">{number}º Generation</p>
                </div>
            </div>
        </div >
    );
}

export default RegionButton;