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
        <form className={styles.formSearchbar} onSubmit={handleSubmit}>
            <input type="text" maxLength="20" placeholder="Find Player/Team" className={styles.inputSearchbar} value={searchInput} onChange={event => setSearchInput(event.target.value)} />
            <button type="submit" name="submit" className={styles.searchButton}>Go</button>
        </form>
        // <div className={styles.formSearchbar}>
        //     <div className={styles.inputSearchbar}>Find Player/Team</div>
        //     <div className={styles.searchButton}>Go</div>
        // </div>
    );
};

export default SearchBar;
