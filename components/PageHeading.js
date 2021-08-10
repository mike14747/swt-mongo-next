import PropTypes from 'prop-types';

const PageHeading = ({ text }) => {
    return (
        <div className="mt-3 mb-4">
            <h2 className="text-center">{text}</h2>
            <hr />
        </div>
    );
};

PageHeading.propTypes = {
    text: PropTypes.string,
};

export default PageHeading;
