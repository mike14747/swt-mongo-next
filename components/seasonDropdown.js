import Link from 'next/link';
import { Fragment } from 'react';

import styles from '../styles/seasonDropdown.module.css';
import PropTypes from 'prop-types';

function Dropdown({ displayedSeason, buttonText, listItems }) {
    return (
        <>
            {displayedSeason &&
                <Fragment>
                    <span className="small">Current View:</span> <span className="font-weight-bolder">{displayedSeason.seasonName}, {displayedSeason.year}</span>
                </Fragment>
            }
            <div className={styles.dropdown}>
                <button className={styles.dropbtn}>{buttonText}<div className={styles.down}></div></button>
                <ul className={styles.dropdownContent}>
                    {listItems.map(item => (
                        <Fragment key={item.seasonId}>
                            {displayedSeason && (item.seasonId === parseInt(displayedSeason.seasonId))
                                ? <li className={styles.viewing}>&gt; {item.seasonName + ' - ' + item.year}</li>
                                : <>
                                    <Link href={item.url}>
                                        <a><li>{item.seasonName + ' - ' + item.year}</li></a>
                                    </Link>
                                </>
                            }
                        </Fragment>
                    ))}
                </ul>
            </div>
        </>
    );
}

Dropdown.propTypes = {
    displayedSeason: PropTypes.object,
    buttonText: PropTypes.string,
    listItems: PropTypes.array,
};

export default Dropdown;
