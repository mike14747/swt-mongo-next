import Link from 'next/link';

import SearchBar from './SearchBar';
import HeaderNav from './HeaderNav';

import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header + ' container'}>
            <h1 className={styles.leftContainer}>
                <Link href="/">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={styles.logoLink}><img className={styles.logo} src="/images/header/skeeball_logo.png" alt="Skeeball World Tour" /></a>
                </Link>
            </h1>

            <div className={styles.rightContainer}>
                <div className={styles.rightItem1}>
                    <SearchBar />
                </div>
                <div className={styles.rightItem2}>
                    <HeaderNav />
                </div>
            </div>
        </header>
    );
};

export default Header;
