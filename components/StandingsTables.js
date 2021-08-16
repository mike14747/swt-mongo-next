import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/table.module.css';

const StandingsTables = ({ storesArr }) => {
    return (
        <>
            {storesArr.map(s => (
                <article key={`${s.storeId}${s.divisionId}`}>
                    <h5 className={styles.storeHeading}>{s.storeCity} - {s.divisionName}</h5>
                    <section className={styles.tableWrapper}>
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
                                {s.teams.map(s => (
                                    <tr key={s.teamId}>
                                        <td className={styles.textLeft}>
                                            <Link href={'/teams/' + s.teamId}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a>{s.teamName}</a>
                                            </Link>
                                        </td>
                                        <td>{s.wins}</td>
                                        <td>{s.losses}</td>
                                        <td>{s.ties}</td>
                                        <td>{s.totalPoints}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </article>
            ))}
        </>
    );
};

StandingsTables.propTypes = {
    storesArr: PropTypes.array,
};

export default StandingsTables;
