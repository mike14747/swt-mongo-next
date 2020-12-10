import PropTypes from 'prop-types';

import Link from 'next/link';

import styles from '../../../styles/navButton.module.css';

export default function NavButton({ href, buttonText }) {
    return (
        <div className={styles.navbutton}>
            <Link href={href}>
                <a><div className={styles.navbtn}>{buttonText}</div></a>
            </Link>
        </div>
    );
}

NavButton.propTypes = {
    buttonText: PropTypes.string,
    href: PropTypes.string,
};
