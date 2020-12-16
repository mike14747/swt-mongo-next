import PropTypes from 'prop-types';

const PlayerStatsBlockItem = ({ heading, value }) => {
    return (
        <>
            <div className="grid-heading">{heading}</div>
            <div className="grid-value">{value}</div>

            <style jsx>{`
                .grid-heading {
                    background-color: #eee8aa;
                    font-weight: bolder;
                    padding: 1rem;
                    text-align: right;
                    border-right: 1px #6c757d solid;
                    border-bottom: 1px #6c757d solid;
                }
                .grid-value {
                    padding: 1rem;
                    text-align: center;
                    border-bottom: 1px #6c757d solid;
                }
            `}</style>
        </>
    );
};

PlayerStatsBlockItem.propTypes = {
    heading: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PlayerStatsBlockItem;
