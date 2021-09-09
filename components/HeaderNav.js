/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import HeaderNavLinks from '../lib/headerNavLinks';

import styles from '../styles/HeaderNav.module.css';

const HeaderNav = () => {
    return (
        <nav aria-label="Secondary Navigation" className={styles.hNavContainer}>
            <span className={styles.hNavBurger}>&#9776;</span>
            <ul className={styles.hNavContent}>
                {HeaderNavLinks?.length > 0 &&
                    HeaderNavLinks.map((item, index) => (
                        <li key={index} className={styles.navItem}>
                            <Link href={item.href}>
                                <a className={styles.link}>{item.text}</a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default HeaderNav;
