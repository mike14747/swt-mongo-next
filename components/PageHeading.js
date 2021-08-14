import PropTypes from 'prop-types';

import styles from '../styles/PageHeading.module.css';

const PageHeading = ({ text }) => {
    return (
        <h2 className={styles.pageHeading}>{text}</h2>
    );
};

PageHeading.propTypes = {
    text: PropTypes.string,
};

export default PageHeading;
