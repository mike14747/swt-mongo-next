import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/SearchBar.module.css';

const SearchBar = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            setSearchInput('');
            setSubmitted(false);
        }
    }, [submitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.length > 0) {
            router.push(`/search/${searchInput}`);
            setSubmitted(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                aria-label= "Find Player/Team"
                type="text"
                maxLength="20"
                placeholder="Find Player/Team"
                className={styles.inputSearchbar}
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
            />
        </form>
    );
};

export default SearchBar;
