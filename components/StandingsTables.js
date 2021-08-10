import PropTypes from 'prop-types';
import StandingsRow from './StandingsRow';

import styles from '../styles/StandingsTables.module.css';

const StandingsTables = ({ storesArr }) => {
    return (
        <>
            {storesArr.map(s => (
                <article key={`${s.storeId}${s.divisionId}`}>
                    <h5 className={styles.storeHeading}>{s.storeCity} - {s.divisionName}</h5>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table + ' ' + styles.tableBordered}>
                            <thead>
                                <tr className={styles.headingRow}>
                                    <th className={styles.textLeft}>TEAM</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>T</th>
                                    <th>TOTAL POINTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <StandingsRow standingsRowData={s.teams} />
                            </tbody>
                        </table>
                    </div>
                </article>
            ))}
        </>
    );
};

StandingsTables.propTypes = {
    storesArr: PropTypes.array,
};

export default StandingsTables;
