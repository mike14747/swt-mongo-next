import PropTypes from 'prop-types';
import StandingsRow from './subcomponents/standingsRow/standingsRow';

const StandingsTables = ({ standingsArr }) => {
    return (
        <>
            {standingsArr.map(({ storeDivision, storeCity, dayName, standingsList }) => (
                <div key={storeDivision}>
                    <h5 className="text-center">{storeCity} - {dayName}</h5>
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
                                    <StandingsRow standingsRowData={standingsList} />
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
    standingsArr: PropTypes.array,
};

export default StandingsTables;
