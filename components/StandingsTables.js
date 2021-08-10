import PropTypes from 'prop-types';
import StandingsRow from './StandingsRow';

const StandingsTables = ({ storesArr }) => {
    return (
        <>
            {storesArr.map(s => (
                <div key={`${s.storeId}${s.divisionId}`}>
                    <h5 className="text-center">{s.storeCity} - {s.divisionName}</h5>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="min-w-50 mx-auto table-wrapper">
                            <table className="table table-bordered mb-4 text-center">
                                <thead>
                                    <tr className="bg-gray6">
                                        <th className="text-left">TEAM</th>
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
                    </div>
                </div>
            ))}
        </>
    );
};

StandingsTables.propTypes = {
    storesArr: PropTypes.array,
};

export default StandingsTables;
