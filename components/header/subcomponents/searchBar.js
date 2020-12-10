import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
        <div className="mt-auto">
            <form className="formSearchbar" onSubmit={handleSubmit}>
                <input type="text" maxLength="20" placeholder="Find Player/Team" className="inputSearchbar" value={searchInput} onChange={event => setSearchInput(event.target.value)} />
                <button type="submit" name="submit" className="searchButton">Go</button>
            </form>

            <style jsx>{`
                .formSearchbar {
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.25;
                    color: #495057;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                    background-color: rgba(255, 255, 255, 0.2);
                    border: 1px #999999 solid;
                    text-align: center;
                    box-sizing: border-box;
                    display: inline-block;
                }
                
                .inputSearchbar {
                    display: inline-block;
                    border: 1px #999999 solid;
                    border-radius: 5px;
                    padding: 0.35rem;
                    margin: 0.25rem;
                    color: #333333;
                    background-color: #ffffff;
                    vertical-align: middle;
                    width: 180px;
                    max-width: calc(2.5vw + 2.5vh + .5vmin + 70px);
                    box-sizing: border-box;
                }
                
                .inputSearchbar:focus {
                    outline: 0;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 123, 0.25);
                }
                
                .searchButton {
                    display: inline-block;
                    color: #333333;
                    background-color: #d9d9d9;
                    vertical-align: middle;
                    border: 1px solid #999999;
                    padding: 0.35rem;
                    margin: 0.25rem;
                    border-radius: 0.25rem;
                    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
                        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                }
                
                .searchButton:hover {
                    cursor: pointer;
                    color: #212529;
                    background-color: #eeeeee;
                    text-decoration: none;
                }
                
                .searchButton:focus {
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 123, 0.25);
                }
                
                @media (max-width: 575.98px) {
                    .searchButton,
                    .inputSearchbar {
                        padding: 0.25rem;
                        margin: 0.15rem;
                    }
                    .formSearchbar {
                        font-size: .75rem;
                    }
                }
                
            `}</style>
        </div >
    );
};

export default SearchBar;
