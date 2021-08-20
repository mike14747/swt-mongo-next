import PropTypes from 'prop-types';
import Link from 'next/link';

import tableStyles from '../styles/table.module.css';

const StandingsTables = ({ currentSeasonId, storesArr }) => {
    return (
        <>
            {storesArr.map(s => (
                <article key={`${s.storeId}${s.divisionId}`}>
                    <h5 className={tableStyles.storeHeading}>{s.storeCity} - {s.divisionName}</h5>
                    <section className={tableStyles.tableWrapper}>
                        <table className={tableStyles.table + ' ' + tableStyles.tableBordered + ' ' + tableStyles.tableHover}>
                            <thead>
                                <tr className={tableStyles.headingRow}>
                                    <th className={tableStyles.textLeft}>TEAM</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>T</th>
                                    <th>TOTAL POINTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {s.teams.map(s => (
                                    <tr key={s.teamId}>
                                        <td className={tableStyles.textLeft}>
                                            <Link href={'/team/' + s.teamId + '/season/' + currentSeasonId}>
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
    currentSeasonId: PropTypes.number,
    storesArr: PropTypes.array,
};

export default StandingsTables;
