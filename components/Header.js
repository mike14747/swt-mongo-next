import Link from 'next/link';

import SearchBar from './searchBar';
import HeaderNav from './headerNav';
import JoinFun from './joinFun';

import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <Link href="/">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a><img className={styles.logo} src="/images/header/skeeball_logo.png" alt="Skeeball World Tour" /></a>
                </Link>
            </div>
            <div className={styles.headerMiddle}>
                <JoinFun />
                <SearchBar />
            </div>
            <div className={styles.headerRight}>
                <HeaderNav />
            </div>
        </header>
    );
};

export default Header;
