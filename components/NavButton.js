import PropTypes from 'prop-types';

import Link from 'next/link';

import styles from '../styles/NavButton.module.css';

export default function NavButton({ href, buttonText }) {
    return (
        <Link href={href}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a><button className={styles.navbtn}>{buttonText}</button></a>
        </Link>
    );
}

NavButton.propTypes = {
    buttonText: PropTypes.string,
    href: PropTypes.string,
};
