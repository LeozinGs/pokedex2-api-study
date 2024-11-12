import './styles.css';
import logo from '../../assets/pokedex-logo.svg';

const Intro = () => {
    return (
        <div className='loading'>
            <img src={logo} alt="App logo" />
        </div>
    );
}

export default Intro;