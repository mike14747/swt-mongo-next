import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/navDropdown.module.css';

export default function NavDropdown({ buttonText, listItems }) {
    return (
        <div className={styles.navdropdown}>
            <div className={styles.navdropbtn}>{buttonText}</div>
            <div className={styles.navdropdownContent}>
                {listItems.map(item => (
                    <div className={styles.item} key={item.id}>
                        <Link href={item.href}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>{item.text}</a>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

NavDropdown.propTypes = {
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
};
