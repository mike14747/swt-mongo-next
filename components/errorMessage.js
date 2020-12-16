import PropTypes from 'prop-types';

const ErrorMessage = ({ text }) => {
    return (
        <h3 className="text-danger text-center">{text}</h3>
    );
};

ErrorMessage.propTypes = {
    text: PropTypes.string,
};

export default ErrorMessage;
