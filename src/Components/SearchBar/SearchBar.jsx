import { useState } from 'react';
import './styles.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    }

    return (
        <div className='search-container'>
            <input
                className='search-bar'
                type="text"
                placeholder='Search Pokémon by name or ID'
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;