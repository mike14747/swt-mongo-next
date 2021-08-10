import { useContext } from 'react';

import ReactHtmlParser from 'react-html-parser';

import HeaderContext from '../context/headerContext';
import styles from '../styles/JoinFun.module.css';

const JoinFun = () => {
    const headerData = useContext(HeaderContext);

    return (
        <div className={styles.joinDropdown}>
            {headerData?.heading &&
                <div className={styles.joinHeading}>
                    {headerData.heading} +
                </div>
            }
            {headerData?.content &&
                <div className={styles.joinDropdownContent}>
                    {ReactHtmlParser(headerData.content)}
                </div>
            }
        </div>

    );
};

export default JoinFun;
