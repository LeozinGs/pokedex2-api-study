import './styles.css';

const SearchBar = () => {
    return (
        <div className='search-container'>
            <input className='search-bar' type="text" placeholder='Procurar Pokémon' />
        </div>
    );
}

export default SearchBar;