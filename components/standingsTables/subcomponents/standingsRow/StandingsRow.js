import PropTypes from 'prop-types';
import Link from 'next/link';

const StandingsRow = ({ standingsRowData }) => {
    return (
        <>
            {standingsRowData.map(s => (
                <tr key={s.teamId}>
                    <td className="text-left">
                        <Link href={'/teams/' + s.teamId}>
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
