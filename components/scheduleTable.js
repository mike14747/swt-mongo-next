import PropTypes from 'prop-types';
import Link from 'next/link';

import tableStyles from '../styles/table.module.css';

const ScheduleTable = ({ currentSeasonId, schedule }) => {
    return (
        <article>
            {schedule.map((week) => (
                <section key={week.weekId}>
                    <h4 className={tableStyles.weekHeading}>Week {week.weekId} <small>({week.date})</small></h4>
                    <div className={tableStyles.tableWrapper}>
                        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                        <table tabIndex="0" className={tableStyles.table + ' ' + tableStyles.tableBordered + ' ' + tableStyles.tableHover}>
                            <thead>
                                <tr className={tableStyles.headingRow}>
                                    <th className={tableStyles.textLeft}>Away Team</th>
                                    <th className={tableStyles.textLeft}>Home Team</th>
                                    <th>Alley</th>
                                    <th>Start Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {week.matchups.map((matchup, index) => (
                                    <tr key={index}>
                                        <td className={tableStyles.textLeft}>
                                            <Link href={'/team/' + matchup.awayTeam.teamId + '/season/' + currentSeasonId}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a>{matchup.awayTeam.teamName}</a>
                                            </Link>
                                        </td>
                                        <td className={tableStyles.textLeft}>
                                            <Link href={'/team/' + matchup.homeTeam.teamId + '/season/' + currentSeasonId}>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a>{matchup.homeTeam.teamName}</a>
                                            </Link>
                                        </td>
                                        <td className="text-center">{matchup.alley}</td>
                                        <td>{matchup.startTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section >
            ))
            }
        </article>
    );
};

ScheduleTable.propTypes = {
    schedule: PropTypes.array,
};

export default ScheduleTable;
