import PropTypes from 'prop-types';

import styles from '../styles/ErrorMessage.module.css';

const ErrorMessage = ({ text }) => {
    return (
        <h3 className={styles.errorHeading}>{text}</h3>
    );
};

ErrorMessage.propTypes = {
    text: PropTypes.string,
};

export default ErrorMessage;
