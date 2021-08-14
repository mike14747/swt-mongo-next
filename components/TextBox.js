import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import styles from '../styles/TextBox.module.css';

const TextBox = ({ data }) => {
    return (
        <aside className={styles.textBoxDropdown}>
            {data?.heading &&
                <div className={styles.textBoxHeading}>
                    {data.heading}
                </div>
            }
            {data?.content &&
                <div className={styles.textBoxDropdownContent}>
                    {ReactHtmlParser(data.content)}
                </div>
            }
        </aside>

    );
};

TextBox.propTypes = {
    data: PropTypes.object,
};

export default TextBox;
