import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/StandingsRow.module.css';

const StandingsRow = ({ standingsRowData }) => {
    return (
        <>
            {standingsRowData.map(s => (
                <tr key={s.teamId}>
                    <td className={styles.teamName}>
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
        </>
    );
};

StandingsRow.propTypes = {
    standingsRowData: PropTypes.array,
};

export default StandingsRow;
