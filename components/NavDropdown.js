import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/NavDropdown.module.css';

export default function NavDropdown({ buttonText, listItems }) {
    return (
        <div className={styles.navdropdown}>
            <button className={styles.navdropbtn}>{buttonText}</button>
            <ul className={styles.navdropdownContent}>
                {listItems?.length > 0 &&
                    listItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>{item.text}</a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

NavDropdown.propTypes = {
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
};
