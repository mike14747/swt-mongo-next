import PropTypes from 'prop-types';

const PlayerStatsBlockItem = ({ heading, value }) => {
    return (
        <>
            <tr>
                <td className="bg-stat-heading font-weight-bolder text-right">{heading}</td>
                <td className="text-center px-4">{value}</td>
            </tr>
            <style jsx>{`
                .bg-stat-heading {
                    background-color: #eee8aa;
                }
            `}</style>
        </>
    );
};

PlayerStatsBlockItem.propTypes = {
    heading: PropTypes.string,
    value: PropTypes.number,
};

export default PlayerStatsBlockItem;
