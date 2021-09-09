import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import styles from '../styles/asideDropdowns.module.css';

const TextBox = ({ data }) => {
    return (
        <aside aria-label="Text Box" className={styles.section}>
            {data?.heading &&
                <h4 className={styles.heading + ' ' + styles.textBoxHeading}>
                    {data.heading}
                </h4>
            }
            {data?.content &&
                <div className={styles.dropdownContent + ' ' + styles.textBoxDropdownContent}>
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
