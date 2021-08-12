import Link from 'next/link';
import { Fragment } from 'react';

import PropTypes from 'prop-types';

import styles from '../styles/SeasonDropdown.module.css';

function Dropdown({ displayedSeason, buttonText, listItems }) {
    return (
        <aside className={styles.seasonDropdown}>
            {displayedSeason &&
                <>
                    <span className={styles.currentText}>Current View:</span> <span className={styles.currentSeasonText}>{displayedSeason.seasonName}, {displayedSeason.year}</span><span className={styles.break}></span>
                </>
            }
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>{buttonText}</button>
                <ul className={styles.dropdownContent}>
                    {listItems.map(item => (
                        <Fragment key={item.seasonId}>
                            {displayedSeason && (item.seasonId === parseInt(displayedSeason.seasonId))
                                ? <li className={styles.viewing}>-- {item.seasonName + ' - ' + item.year} --</li>
                                : <li>
                                    <Link href={item.url}>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a>{item.seasonName + ' - ' + item.year}</a>
                                    </Link>
                                </li>
                            }
                        </Fragment>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

Dropdown.propTypes = {
    displayedSeason: PropTypes.object,
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
};

export default Dropdown;
